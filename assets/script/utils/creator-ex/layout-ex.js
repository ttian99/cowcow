/**
 用于刷新layout控件
 */
const layout = {};
layout.updateLayout = (node) => {
  const nodelayout = node.getComponent('cc.Layout');
  if (nodelayout) {
    if (node.childrenCount > 0) {
      nodelayout._updateLayout();
    } else if (node.childrenCount === 0) {
      nodelayout._doLayout();
    }
  } else {
    console.log('当前节点并没有layout组件 node.name===' + node.name);
  }
};
export default layout;
