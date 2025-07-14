export interface TreeNode {
  _nodeId: string;
  _name: string;
  _fgs?: string;
  _state?: string;
  _overstock?: string;
  _stockout?: string;
  _nodeFlags?: string;
  cat?: TreeNode[] | TreeNode;
  leaf?: TreeNode[];
}

export interface DataJson {
  tree: {
    cat: TreeNode;
  };
}
