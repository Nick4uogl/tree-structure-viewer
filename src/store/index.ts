import { createStore } from "vuex";

interface TreeNode {
  _nodeId: string;
  _name: string;
  cat?: TreeNode[] | TreeNode;
  leaf?: TreeNode[];
}

interface State {
  tree: TreeNode | null;
  selectedNodeId: string | null;
  expandedNodeIds: string[];
  selectedList: TreeNode[];
}

export default createStore<State>({
  state: {
    tree: null,
    selectedNodeId: null,
    expandedNodeIds: [],
    selectedList: [],
  },
  mutations: {
    setTree(state: State, tree: TreeNode) {
      state.tree = tree;
    },
    setSelectedNodeId(state: State, nodeId: string) {
      state.selectedNodeId = nodeId;
      localStorage.setItem("selectedNodeId", nodeId);
    },
    setExpandedNodeIds(state: State, ids: string[]) {
      state.expandedNodeIds = ids;
      localStorage.setItem("expandedNodeIds", JSON.stringify(ids));
    },
    setSelectedList(state: State, list: TreeNode[]) {
      state.selectedList = list;
      localStorage.setItem("selectedList", JSON.stringify(list));
    },
    addToSelectedList(state: State, item: TreeNode) {
      if (
        !state.selectedList.find((i: TreeNode) => i._nodeId === item._nodeId)
      ) {
        state.selectedList.push(item);
        localStorage.setItem(
          "selectedList",
          JSON.stringify(state.selectedList)
        );
      }
    },
    removeFromSelectedList(state: State, nodeId: string) {
      state.selectedList = state.selectedList.filter(
        (i: TreeNode) => i._nodeId !== nodeId
      );
      localStorage.setItem("selectedList", JSON.stringify(state.selectedList));
    },
    restoreState(state: State) {
      const selectedNodeId = localStorage.getItem("selectedNodeId");
      const expandedNodeIds = localStorage.getItem("expandedNodeIds");
      const selectedList = localStorage.getItem("selectedList");

      if (selectedNodeId) {
        state.selectedNodeId = selectedNodeId;
      }

      if (expandedNodeIds) {
        try {
          state.expandedNodeIds = JSON.parse(expandedNodeIds);
        } catch (e) {
          state.expandedNodeIds = [];
        }
      }

      if (selectedList) {
        try {
          state.selectedList = JSON.parse(selectedList);
        } catch (e) {
          state.selectedList = [];
        }
      }
    },
  },
  actions: {
    initializeState({ commit }: { commit: any }) {
      commit("restoreState");
    },
  },
  getters: {},
});
