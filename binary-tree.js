/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree. */
  minDepth() {
    if (!this.root) return 0;

    function _minDepth(node) {
      if (!node) return Infinity; // Base case
      if (!node.left && !node.right) return 1;

      return 1 + Math.min(_minDepth(node.left), _minDepth(node.right));
    }

    return _minDepth(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree. */
  maxDepth() {
    if (!this.root) return 0;

    function _maxDepth(node) {
      if (!node) return 0;
      return 1 + Math.max(_maxDepth(node.left), _maxDepth(node.right));
    }

    return _maxDepth(this.root);
  }

  /** maxSum(): return the maximum sum traveling along a path in the tree. */
  maxSum() {
    if (!this.root) return 0; // Add this line to handle empty trees
    
    let max = -Infinity;
  
    function _maxSum(node) {
      if (!node) return 0;
  
      let left = Math.max(_maxSum(node.left), 0);
      let right = Math.max(_maxSum(node.right), 0);
  
      max = Math.max(max, node.val + left + right);
  
      return node.val + Math.max(left, right);
    }
  
    _maxSum(this.root);
    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree larger than lowerBound. */
  nextLarger(lowerBound) {
    let result = null;

    function _nextLarger(node) {
      if (!node) return;

      if (node.val > lowerBound) {
        if (result === null) {
          result = node.val;
        } else {
          result = Math.min(result, node.val);
        }
      }

      _nextLarger(node.left);
      _nextLarger(node.right);
    }

    _nextLarger(this.root);
    return result;
  }

  /** areCousins(node1, node2): determine whether two nodes are cousins. */
  areCousins(node1, node2) {
    function _depthAndParent(node, target, parent = null, depth = 0) {
      if (!node) return null;
      if (node.val === target.val) return { depth, parent };

      let left = _depthAndParent(node.left, target, node, depth + 1);
      if (left) return left;

      return _depthAndParent(node.right, target, node, depth + 1);
    }

    let info1 = _depthAndParent(this.root, node1);
    let info2 = _depthAndParent(this.root, node2);

    return info1 && info2 && info1.depth === info2.depth && info1.parent !== info2.parent;
  }

  /** serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    function _serialize(node) {
      if (!node) return 'null,';
      return node.val + ',' + _serialize(node.left) + _serialize(node.right);
    }

    return _serialize(tree.root);
  }

  /** deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(data) {
    const values = data.split(',');

    function _deserialize() {
      const value = values.shift();
      if (value === 'null') return null;
      const newNode = new BinaryTreeNode(Number(value));
      newNode.left = _deserialize();
      newNode.right = _deserialize();
      return newNode;
    }

    return new BinaryTree(_deserialize());
  }

  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor of two nodes. */
  lowestCommonAncestor(node1, node2) {
    function _LCA(node) {
      if (!node || node === node1 || node === node2) return node;

      let left = _LCA(node.left);
      let right = _LCA(node.right);

      if (left && right) return node;  // Found LCA
      return left ? left : right;      // Either one of the nodes was found
    }

    return _LCA(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
