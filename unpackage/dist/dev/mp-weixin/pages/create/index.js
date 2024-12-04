"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const outfitImage = common_vendor.ref("");
    const outfitTitle = common_vendor.ref("");
    const outfitDescription = common_vendor.ref("");
    const outfitItems = common_vendor.ref([{ name: "", price: "" }]);
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          outfitImage.value = res.tempFilePaths[0];
        }
      });
    };
    const addOutfitItem = () => {
      outfitItems.value.push({ name: "", price: "" });
    };
    const createOutfitCard = () => {
      console.log("Creating outfit card:", {
        image: outfitImage.value,
        title: outfitTitle.value,
        description: outfitDescription.value,
        items: outfitItems.value
      });
      common_vendor.index.switchTab({ url: "/pages/home/index" });
    };
    return {
      outfitImage,
      outfitTitle,
      outfitDescription,
      outfitItems,
      chooseImage,
      addOutfitItem,
      createOutfitCard
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.outfitImage
  }, $setup.outfitImage ? {
    b: $setup.outfitImage
  } : {}, {
    c: common_vendor.o((...args) => $setup.chooseImage && $setup.chooseImage(...args)),
    d: $setup.outfitTitle,
    e: common_vendor.o(($event) => $setup.outfitTitle = $event.detail.value),
    f: $setup.outfitDescription,
    g: common_vendor.o(($event) => $setup.outfitDescription = $event.detail.value),
    h: common_vendor.f($setup.outfitItems, (item, index, i0) => {
      return {
        a: item.name,
        b: common_vendor.o(($event) => item.name = $event.detail.value, index),
        c: item.price,
        d: common_vendor.o(($event) => item.price = $event.detail.value, index),
        e: index
      };
    }),
    i: common_vendor.o((...args) => $setup.addOutfitItem && $setup.addOutfitItem(...args)),
    j: common_vendor.o((...args) => $setup.createOutfitCard && $setup.createOutfitCard(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cd35ab0"]]);
wx.createPage(MiniProgramPage);
