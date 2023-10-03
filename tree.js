/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    function _sumValues(node) {
      if (!node) return 0;
      let sum = node.val;
      for (let child of node.children) {
        sum += _sumValues(child);
      }
      return sum;
    }

    return _sumValues(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    function _countEvens(node) {
      if (!node) return 0;
      let count = node.val % 2 === 0 ? 1 : 0;
      for (let child of node.children) {
        count += _countEvens(child);
      }
      return count;
    }

    return _countEvens(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    function _numGreater(node, lowerBound) {
      if (!node) return 0;
      let count = node.val > lowerBound ? 1 : 0;
      for (let child of node.children) {
        count += _numGreater(child, lowerBound);
      }
      return count;
    }

    return _numGreater(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
