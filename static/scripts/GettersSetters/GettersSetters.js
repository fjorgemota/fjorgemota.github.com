String.prototype.title = function() {
    return this.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}
document.body.onload = function() {
    document.getElementById("generate").onclick = function() {
        var code = document.getElementById("code").value, lines = code.split("\n"), setRow = "", getters = '', init_comment = "/*", final_comment = "*/", setters = '', line = '', lang = null, tokens = [],toArray='';
        if(code.match(/(private|protected|public)?\$([^;]*);/gi)) {
            lang = "php";
        } else if(code.substring(0, 5) == "this.") {
            lang = "js";
        } else if(code.match(/((private|protected|public)\s)?([^\s]{1,}) ([^;\n]{1,});/)) {
            lang = "java";
        } else if(code.match(/([^=\n]*)=?([^\n]*)/)) {
            init_comment = "#";
            final_comment = "";
            lang = "python";
        }
        if(!lang) {
            alert("Linguagem nao reconhecida!");
            return;
        }
        var vars = [];
        for(var c = 0, l = lines.length; c < l; ++c) {
        	lines[c] = lines[c].trim();
            line = lines[c];
            var old_tokens = line.split(" ");
            var tokens = [];
            for(var c2 = 0, l2 = old_tokens.length; c2 < l2; ++c2) {
                if(old_tokens[c2].trim() != "") {
                    tokens.push(old_tokens[c2].trim());
                }
            }
            if(tokens.length == 0) {
                continue;
            }
            console.log("Processando linha na linguagem " + lang);
            switch(lang) {
                case "php":
                    if(["protected", "public", "private"].indexOf(tokens[0].toLowerCase()) == -1) {
                        tokens.unshift("public");
                    }
                    if(tokens.length < 2) {
                        continue;
                    }
                    if(tokens[1].substring(tokens[1].length - 1) == ";") {
                        tokens[1] = tokens[1].substring(0, tokens[1].length - 1);
                    }
                    tokens[1] = tokens[1].split("=")[0];
                    if(!tokens[1]) {
                        continue;
                    }
                    vars.push(tokens[1]);
                    getters += "public function get" + tokens[1].substring(1).replace("_", " ").title().replace(" ", "") + "(){\n    return $this->" + tokens[1].substring(1) + ";\n}\n";
                    setters += "public function set" + tokens[1].substring(1).replace("_", " ").title().replace(" ", "") + "($new_" + tokens[1].substring(1) + "){\n    $this->" + tokens[1].substring(1) + " = $new_" + tokens[1].substring(1) + ";\n}\n";

                    break;
                case "js":
                    tokens = line.split("this.")[1].split(" ")[0];
                    if(tokens.substring(tokens.length - 1) == ";") {
                        tokens = tokens.substring(0, tokens.length - 1);
                    }
                    tokens = tokens.split("=")[0];
                    if(tokens.length == 0) {
                        continue;
                    }
                    vars.push(tokens);
                    getters += "this.get" + tokens.replace("_", " ").title().replace(" ", "") + " = function(){\n    return this." + tokens + ";\n}\n";
                    setters += "this.set" + tokens.replace("_", " ").title().replace(" ", "") + " = function(new_" + tokens + "){\n    this." + tokens + " = new_" + tokens + ";\n}\n";
                    break;
                case "java":
                    if(["protected", "public", "private"].indexOf(tokens[0].toLowerCase()) == -1) {
                        tokens.unshift("public");
                    }
                    if(tokens.length < 3) {
                        continue;
                    }
                    if(tokens[2].substring(tokens[2].length - 1) == ";") {
                        tokens[2] = tokens[2].substring(0, tokens[2].length - 1);
                    }
                    tokens[2] = tokens[2].split("=")[0];
                    if(!tokens[1] || !tokens[2]) {
                        continue;
                    }
                    vars.push(tokens[2]);
                    getters += "public " + tokens[1] + " get" + tokens[2].replace("_", " ").title().replace(" ", "") + "(){\n    return this." + tokens[2] + ";\n}\n";
                    setters += "public void set" + tokens[2].replace("_", " ").title().replace(" ", "") + "(" + tokens[1] + " new_" + tokens[2] + "){\n    this." + tokens[2] + " = new_" + tokens[2] + ";\n}\n";
                    break;
                case "python":
                    tokens = line.split("=")[0];
                    if(!tokens) {
                        continue;
                    }
					tokens = tokens.replace("self.","").trim();
                    vars.push(tokens);
                    getters += "def get" + tokens.replace("_", " ").title().replace(" ", "") + "(self):\n    return self." + tokens + "\n";
                    setters += "def set" + tokens.replace("_", " ").title().replace(" ", "") + "(self, new_" + tokens + "):\n    self." + tokens + " = new_" + tokens + "\n";
                    break;
            }
        }
        switch(lang) {
            case "php":
                setRow = "public function setRow($row){";
                toArray = "public function toArray(){\n    $result = array();";
                for(var c = 0, l = vars.length; c < l; ++c) {
                    setRow += "\n    $this->" + vars[c].substring(1) + " = $row->" + vars[c].substring(1) + ";";
                    toArray+= "\n    $result['" + vars[c].substring(1) + "'] = $this->" + vars[c].substring(1) + ";";
                }
                setRow += "\n}";
                toArray += "\n    return $result;\n}";
                break;
            case "js":
                setRow = "this.setRow = function(row){";
                toArray = "\nthis.toArray = function(){\n    var result = {};";
                for(var c = 0, l = vars.length; c < l; ++c) {
                    setRow += "\n    this." + vars[c] + " = row." + vars[c]+ ";";
                    toArray += "\n    result['" + vars[c] + "'] = this." + vars[c]+ ";";
                }
                setRow += "\n}";
                toArray += "\n    return result;\n}";
                break;
            case "java":
                setRow = "public void setRow(Object row){";
                toArray = "public HashMap<String, Object> toArray(){\n    HashMap<String, Object> result = new HashMap<String, Object>();";
                for(var c = 0, l = vars.length; c < l; ++c) {
                    setRow += "\n    this." + vars[c] + " = row." + vars[c]+ ";";
                    toArray += "\n    result.put('" + vars[c] + "',this." + vars[c]+ ");";
                }
                setRow += "\n}";
                toArray += "\n    return result;\n}";
                break;
            case "python":
                setRow = "def setRow(self, row):";
                toArray = "def toArray(self):\n    result={}";
                for(var c = 0, l = vars.length; c < l; ++c) {
                    setRow += "\n    self." + vars[c] + " = row['" + vars[c]+ "']";
                    toArray += "\n    result['"+vars[c]+"'] = self."+vars[c];
                }
                setRow += "\n";
                toArray += "\n    return result";
                break;
        }
        document.getElementById("code_generated").value = lines.join("\n")+"\n"+init_comment+" Getters "+final_comment+"\n" + getters + "\n"+init_comment+" Setters "+final_comment+"\n" + setters+"\n"+init_comment+" setRow "+final_comment+"\n"+setRow+"\n\n"+init_comment+" toArray "+final_comment+"\n"+toArray+"\n";
    }
}
