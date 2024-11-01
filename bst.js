
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

        const buildTreeRecursive = (array) => {
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

    height(node) {
        if (!node) return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node) return -1;
        let current = this.root;
        let depth = 0;

        while (current && current !== node) {
            if (node.data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            depth++;
        }
        return current ? depth : -1;
    }

    isBalanced() {
        const leftHeight = this.height(this.left);
        const rightHeight = this.height(this.right);
        
        return Math.abs(leftHeight - rightHeight) <= 1 &&
               (!this.left || this.left.isBalanced()) &&
               (!this.right || this.right.isBalanced());
    }


    reBalance() {
        const sortedNodes = [];
        this.inOrder(node => sortedNodes.push(node.data));
        this.root = this.buildTree(sortedNodes);
    }
}

function generateRandomArray(length, max) {
    const randomNumbers = new Set();
    while (randomNumbers.size < length) {
        randomNumbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(randomNumbers);
}

function runTreeDemo() {
    const randomArray = generateRandomArray(15, 100);
    console.log("Random numbers used to create the tree:", randomArray);

    const tree = new Tree(randomArray);
    console.log("Is the tree balanced?", tree.isBalanced());

    console.log("Level order:");
    tree.levelOrder(node => console.log(node.data));

    console.log("Pre-order:");
    tree.preOrder(node => console.log(node.data));

    console.log("In-order:");
    tree.inOrder(node => console.log(node.data));

    console.log("Post-order:");
    tree.postOrder(node => console.log(node.data));

    // Unbalance the tree by adding numbers > 100
    const unbalancedNumbers = [101, 102, 103, 104, 105];
    unbalancedNumbers.forEach(num => tree.insert(num));
    console.log("Inserted numbers to unbalance the tree:", unbalancedNumbers);

    console.log("Is the tree balanced after inserting > 100?", tree.isBalanced());

    // Balance the tree
    tree.rebalance();
    console.log("Tree rebalanced.");

    console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

    console.log("Level order after rebalancing:");
    tree.levelOrder(node => console.log(node.data));

    console.log("Pre-order after rebalancing:");
    tree.preOrder(node => console.log(node.data));

    console.log("In-order after rebalancing:");
    tree.inOrder(node => console.log(node.data));

    console.log("Post-order after rebalancing:");
    tree.postOrder(node => console.log(node.data));
}

runTreeDemo()