"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const outfit = common_vendor.ref({
      id: 1,
      title: "夏日清凉套装",
      image: "https://picsum.photos/400/600?random=1",
      likes: 120,
      comments: [
        { user: "用户A", content: "很喜欢这个搭配！" },
        { user: "用户B", content: "请问鞋子是在哪里买的？" }
      ]
    });
    const isFavorite = common_vendor.ref(false);
    const newComment = common_vendor.ref("");
    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;
      common_vendor.index.showToast({
        title: isFavorite.value ? "已收藏" : "取消收藏",
        icon: "success"
      });
    };
    const addComment = () => {
      if (newComment.value.trim() === "") {
        common_vendor.index.showToast({
          title: "内容不能为空",
          icon: "none"
        });
        return;
      }
      outfit.value.comments.push({
        user: "我",
        content: newComment.value
      });
      newComment.value = "";
      common_vendor.index.showToast({
        title: "留言成功",
        icon: "success"
      });
    };
    return {
      outfit,
      isFavorite,
      newComment,
      toggleFavorite,
      addComment
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $setup.outfit.image,
    b: common_vendor.t($setup.outfit.title),
    c: common_vendor.t($setup.outfit.likes),
    d: common_vendor.t($setup.outfit.comments.length),
    e: common_vendor.t($setup.isFavorite ? "已收藏" : "收藏"),
    f: common_vendor.o((...args) => $setup.toggleFavorite && $setup.toggleFavorite(...args)),
    g: common_vendor.n({
      active: $setup.isFavorite
    }),
    h: common_vendor.f($setup.outfit.comments, (comment, index, i0) => {
      return {
        a: common_vendor.t(comment.user),
        b: common_vendor.t(comment.content),
        c: index
      };
    }),
    i: $setup.newComment,
    j: common_vendor.o(($event) => $setup.newComment = $event.detail.value),
    k: common_vendor.o((...args) => $setup.addComment && $setup.addComment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
