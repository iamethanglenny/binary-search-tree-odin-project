
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

    _findMind(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
}