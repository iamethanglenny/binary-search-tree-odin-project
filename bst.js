
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const uniqueSortedArray = Array.from(new Set(array)).sort((a, b) => a - b);

        function buildTreeRecursive(array) {
            if (array.length === 0) return null;

            const mid = Math.floor(array.length / 2);
            const node = new Node(array[mid]);

            node.left = this.buildTree(array.slice(0, mid));
            node.right = this.buildTree(array.slice(mid + 1));

            return node;
        }

        return buildTreeRecursive(uniqueSortedArray);
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.data) {

                if (!current.left) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else 

            if (!current.right) {
                current.right = current;
                return;
            }
            current = current.right;
        }
    }

    deleteItem(value) {
        this.root = this._deleteNode(this.root, value);
    }

    _deleteNode(node, value) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this._deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this._deleteNode(node.right, value);
        } else {

            if (!node.left && !node.right) {
                return null;
            }

            if (!node.left) {
                return node.right;
            }
            if (!node.right) {
                return node.left;
            }

            const minLargerNode = this._findMin(node.right);
            node.data = minLargerNode.data;
            node.right = this._deleteNode(node.right, minLargerNode.data);
        }

        return node;
    }

    _findMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        let current = this.root;

        while (current) {
            if (value === current.data) {
                return current;
            }
            current = value < current.data ? current.left : current.right;
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required for levelOrder.')
        }
        const queue = [];
        queue.push(this.root);

        const traverse = (nodes) => {
            if(!nodes.length) return null;

            const nextLevel = [];
            for (const node of nodes) {
                callback(node);
                if (node.left) nextLevel.push(node.left);
                if (node.right) nextLevel.push(node.right);
            }
            traverse(nextLevel);
        };

        traverse(queue);
    }

    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required for inOrder.');
        }
        this._inOrder(this.root, callback);
    }

    _inOrder(node, callback) {
        if (node) {
            this._inOrder(node.left, callback);
            callback(node);
            this._inOrder(node.right, callback);
        }
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required for preOrder.');
        }
        this._preOrder(this.root, callback);
    }

    _preOrder(node, callback) {
        if (node) {
            callback(node);
            this._preOrder(node.left, callback);
            this._preOrder(node.right, callback);
        }
    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required for postOrder.');
        }
        this._postOrder(this.root, callback);
    }

    _postOrder(node, callback) {
        if (node) {
            this._postOrder(node.left, callback);
            this._postOrder(node.right, callback);
            callback(node);
        }
    }
}