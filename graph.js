class Graph {
    constructor(x, y, numVerts) {
        this.x = x;
        this.y = y;
        this.numVerts = numVerts;
        this.graph = Graph.randGraph2(numVerts);
        this.selected = null;
        this.perm = [];
        for (let i = 0; i < numVerts; i++) {
            this.perm.push(i);
        }
        this.won = false;
        this.originalPerm = this.perm.slice();
    }

    static randGraph2(numVerts) {
        let out = "";
        let temp = [];
        let edges = numVerts * (numVerts - 1) / 2;
        let t = numVerts;
        for (let i = 0; i < edges; i++) {
            if (i < t) {
                temp.push("1");
            } else {
                temp.push("2");
            }
        }
        shuffle(temp);
        return temp.join("");
    }
    static randGraph(numVerts) {
        let out = "";
        let edges = numVerts * (numVerts - 1) / 2;
        for (let i = 0; i < edges; i++) {
            if (Math.random() < 0.5) {
                out += "1";
            } else {
                out += "2";
            }
        }
        return out;
    }

    isoTo(other) {
        for(let i = 0; i < this.numVerts; i++) {
            for(let j = 0; j < this.numVerts; j++) {
                if (i != j && this.getEdge(this.perm[i], this.perm[j]) !== other.getEdge(other.perm[i], other.perm[j])) {
                    return false;
                }
            }
        }
        return true;
    }

    isVertex(x, y) {
        for (let i = 0; i < this.numVerts; i++) {
            let deltax = x - (this.x + Math.cos(2 * i * Math.PI / this.numVerts) * 150);
            let deltay = y - (this.y + Math.sin(2 * i * Math.PI / this.numVerts) * 150);
            if (Math.sqrt(deltax * deltax + deltay * deltay) < 20) {
                return i;
            }
        }
    }

    getEdge(n, m) {
        let a = Math.min(n, m);
        let b = Math.max(n, m);
        return this.graph.charAt((b * b - b) / 2 + a);
    }

    draw(context) {
        context.push();
        context.translate(this.x, this.y);
        context.rectMode(context.CENTER);
        context.stroke(20);
        context.fill(190);
        context.rect(0, 0, 350, 350, 20);
        let radius = 150;
        let vertices = [];

        context.fill(150);
        context.noStroke();
        //placeholders to know where to drag to
        if(!this.won) {
            for (let i = 0; i < this.numVerts; i++) {
                let x = radius * Math.cos(2 * i * Math.PI / this.numVerts);
                let y = radius * Math.sin(2 * i * Math.PI / this.numVerts);
                context.ellipse(x, y, 40);
            }
        }


        //vertices
        for (let i = 0; i < this.numVerts; i++) {
            if(i != this.selected) {
                vertices.push([
                    radius * Math.cos(2 * i * Math.PI / this.numVerts),
                    radius * Math.sin(2 * i * Math.PI / this.numVerts)
                ]);
            }else{
                vertices.push([context.mouseX - this.x, context.mouseY - this.y]);
            }
        }

        //draw edges
        context.stroke(0, 50);
        for (let i = 0; i < this.numVerts - 1; i++) {
            for (let j = i + 1; j < this.numVerts; j++) {
                if (this.getEdge(this.perm[i], this.perm[j]) === "1") {
                    context.strokeWeight(4);
                    if(!this.won) {
                        if(i != this.selected && j != this.selected) {
                            context.stroke('#4444');
                        }else{
                            context.stroke('#cc3e');
                        }
                    }else{
                        context.strokeWeight(6);
                        context.stroke('#11fe')
                    }
                    context.line(vertices[i][0], vertices[i][1], vertices[j][0], vertices[j][1]);


                }
            }

        }
        context.fill(0);
        context.stroke(0);
        context.strokeWeight(1);
        for (let v in vertices) {
            context.ellipse(vertices[v][0], vertices[v][1], 15);
        }
        context.pop();
    }
}

class staticGraph extends Graph {
    constructor(other) {
        super(other.x, other.y, other.numVerts);
        this.graph = other.graph;
        this.other = other;
        let i = 0;
        while(i < 10 && this.isoTo(other)) {
            shuffle(this.perm);
            i ++;
        }
        //console.log("shuffled " + i);
    }

    draw(context) {
        context.push();
        context.translate(this.x, this.y);
        context.rectMode(context.CENTER);
        context.stroke(20);
        context.fill(190);
        context.rect(0, 0, 350, 350, 20);
        let radius = 150;
        let vertices = [];

        context.fill(150);
        context.noStroke();

        //vertices
        for (let i = 0; i < this.numVerts; i++) {
            vertices.push([
                radius * Math.cos(2 * i * Math.PI / this.numVerts),
                radius * Math.sin(2 * i * Math.PI / this.numVerts)
            ]);
        }

        //draw edges
        context.stroke(0, 50);
        for (let i = 0; i < this.numVerts - 1; i++) {
            for (let j = i + 1; j < this.numVerts; j++) {
                if (this.getEdge(this.perm[i], this.perm[j]) === "1") {
                    context.strokeWeight(4);
                    if(!this.won) {
                        if(this.other.getEdge(this.other.perm[i], this.other.perm[j]) === "1") {
                            context.stroke('#37dc');
                        }else{
                            context.stroke('#d33c');
                        }
                    }else{
                        context.strokeWeight(6);
                        context.stroke('#11fe');
                    }

                    context.line(vertices[i][0], vertices[i][1], vertices[j][0], vertices[j][1]);
                }
            }

        }
        context.fill(0);
        context.stroke(0);
        context.strokeWeight(1);
        for (let v in vertices) {
            context.ellipse(vertices[v][0], vertices[v][1], 15);
        }
        context.pop();
    }
}

class activeGraph extends Graph {

}