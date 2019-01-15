class Graph {
    constructor(context, numVerts, x, y, w) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.numVerts = numVerts;
        this.graph = Graph.randGraph(numVerts);
        this.selected = null;
        this.perm = [];
        this.width = w;
        for (let i = 0; i < numVerts; i++) {
            this.perm.push(i);
        }
        this.won = false;
        this.originalPerm = this.perm.slice();
        this.dropRadius = this.getDropRadius();
        this.radius = (this.width - 10) / (2 * (1 + this.dropRadius));
    }

    getDropRadius() {
        let dx = 1 - Math.cos(2 * Math.PI / this.numVerts);
        let dy = 0 - Math.sin(2 * Math.PI / this.numVerts);
        let dist = Math.sqrt(dx * dx + dy * dy);
        return dist / 2;
    }

    static randGraph(numVerts) {
        let temp = [];
        let edges = numVerts * (numVerts - 1) / 2;
        for (let i = 0; i < edges; i++) {
            if (i < numVerts) {
                temp.push("1");
            } else {
                temp.push("2");
            }
        }
        shuffle(temp);
        return temp.join("");
    }

    isoTo(other) {
        for (let i = 0; i < this.numVerts; i++) {
            for (let j = 0; j < this.numVerts; j++) {
                if (i !== j && this.getEdge(this.perm[i], this.perm[j]) !== other.getEdge(other.perm[i], other.perm[j])) {
                    return false;
                }
            }
        }
        return true;
    }

    isVertex(x, y) {
        for (let i = 0; i < this.numVerts; i++) {
            let deltax = x - (this.x + Math.cos(2 * i * Math.PI / this.numVerts) * this.radius);
            let deltay = y - (this.y + Math.sin(2 * i * Math.PI / this.numVerts) * this.radius);
            if (Math.sqrt(deltax * deltax + deltay * deltay) < this.dropRadius * this.radius) {
                return i;
            }
        }
    }

    getEdge(n, m) {
        let a = Math.min(n, m);
        let b = Math.max(n, m);
        return this.graph.charAt((b * b - b) / 2 + a);
    }

    draw() {
        this.context.push();
        this.context.translate(this.x, this.y);
        let vertices = [];
        for (let i = 0; i < this.numVerts; i++) {
            if (i !== this.selected) {
                vertices.push([
                    this.radius * Math.cos(2 * i * Math.PI / this.numVerts),
                    this.radius * Math.sin(2 * i * Math.PI / this.numVerts)
                ]);
            } else {
                if (this.context.offsetTouch) {
                    vertices.push([this.context.mouseX - this.x, this.context.mouseY - this.y - this.context.height * 0.1]);
                } else {
                    vertices.push([this.context.mouseX - this.x, this.context.mouseY - this.y]);
                }
            }
        }
        //draw edges
        this.context.stroke(0, 50);
        for (let i = 0; i < this.numVerts - 1; i++) {
            for (let j = i + 1; j < this.numVerts; j++) {
                if (this.getEdge(this.perm[i], this.perm[j]) === "1") {
                    this.context.strokeWeight(5);
                    if (!this.won) {
                        if (i !== this.selected && j !== this.selected) {
                            this.context.stroke('#111e');
                        } else {
                            this.context.stroke('#cc3e');
                        }
                    } else {
                        this.context.strokeWeight(6);
                        this.context.stroke('#11fe')
                    }
                    this.context.line(vertices[i][0], vertices[i][1], vertices[j][0], vertices[j][1]);
                }
            }
        }
        this.context.fill(0);
        this.context.stroke(0);
        this.context.strokeWeight(1);
        for (let v in vertices) {
            this.context.ellipse(vertices[v][0], vertices[v][1], 17);
        }
        this.context.pop();
    }
}

class staticGraph extends Graph {
    constructor(other) {
        super(other.context, other.numVerts, other.x, other.y, other.width);
        this.graph = other.graph;
        console.log(this);
        this.other = other;
        let i = 0;
        while (i < 10 && this.isoTo(other)) {
            shuffle(this.perm);
            i++;
        }
        this.originalPerm = this.perm.slice();
    }

    draw() {
        this.context.push();
        this.context.translate(this.x, this.y);
        this.context.rectMode(this.context.CENTER);
        this.context.stroke(2);
        this.context.fill(200);
        this.context.rect(0, 0, this.width, this.width, 20);

        let vertices = [];
        for (let i = 0; i < this.numVerts; i++) {
            if (i !== this.selected) {
                vertices.push([
                    this.radius * Math.cos(2 * i * Math.PI / this.numVerts),
                    this.radius * Math.sin(2 * i * Math.PI / this.numVerts)
                ]);
            } else {
                if (this.context.offsetTouch) {
                    vertices.push([this.context.mouseX - this.x, this.context.mouseY - this.y - this.context.height * 0.1]);
                } else {
                    vertices.push([this.context.mouseX - this.x, this.context.mouseY - this.y]);
                }
            }
        }
        //placeholders to know where to drag to
        this.context.fill(150, 200);
        this.context.noStroke();
        if (!this.won) {
            for (let v of vertices) {
                this.context.ellipse(v[0], v[1], 2 * this.dropRadius * this.radius - 4);
            }
        }

        //draw edges
        this.context.stroke(0, 50);
        for (let i = 0; i < this.numVerts - 1; i++) {
            for (let j = i + 1; j < this.numVerts; j++) {
                if (this.getEdge(this.perm[i], this.perm[j]) === "1") {
                    this.context.strokeWeight(15);
                    if (!this.won) {
                        if (i !== this.selected && j !== this.selected) {
                            if (this.other.getEdge(this.other.perm[i], this.other.perm[j]) === "1") {
                                this.context.stroke('#35e9');
                            } else {
                                this.context.stroke('#d339');
                            }
                        } else {
                            if (this.other.getEdge(this.other.perm[i], this.other.perm[j]) === "1") {
                                this.context.stroke('#35ef');
                            } else {
                                this.context.stroke('#d33f');
                            }
                        }

                    } else {
                        this.context.strokeWeight(6);
                        this.context.stroke('#11fe');
                    }
                    this.context.line(vertices[i][0], vertices[i][1], vertices[j][0], vertices[j][1]);
                }
            }

        }
        this.context.fill(0);
        this.context.stroke(0);
        this.context.strokeWeight(1);
        this.context.pop();
    }
}
