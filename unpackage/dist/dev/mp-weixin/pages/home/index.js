"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const activeTab = common_vendor.ref("recommend");
    const isLoading = common_vendor.ref(true);
    const recommendedOutfits = common_vendor.ref([]);
    const followingOutfits = common_vendor.ref([]);
    const currentOutfits = common_vendor.computed(() => {
      return activeTab.value === "recommend" ? recommendedOutfits.value : followingOutfits.value;
    });
    const setActiveTab = (tab) => {
      activeTab.value = tab;
      fetchOutfits();
    };
    const fetchOutfits = () => {
      isLoading.value = true;
      setTimeout(() => {
        const randomImages = [
          "https://picsum.photos/400/500?random=1",
          "https://picsum.photos/400/600?random=2",
          "https://picsum.photos/400/500?random=3",
          "https://picsum.photos/400/600?random=4",
          "https://picsum.photos/400/500?random=5",
          "https://picsum.photos/400/600?random=6"
        ];
        if (activeTab.value === "recommend") {
          recommendedOutfits.value = randomImages.map((img, index) => ({
            id: index + 1,
            title: `商品卡 ${index + 1}`,
            image: img,
            likes: Math.floor(Math.random() * 200),
            comments: Math.floor(Math.random() * 50)
          }));
        }
        isLoading.value = false;
      }, 1e3);
    };
    const navigateToOutfitDetail = (outfitId) => {
      common_vendor.index.navigateTo({
        url: `/pages/home/outfit-detail`
      });
    };
    fetchOutfits();
    return {
      activeTab,
      isLoading,
      currentOutfits,
      setActiveTab,
      navigateToOutfitDetail
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.activeTab === "recommend" ? 1 : "",
    b: common_vendor.o(($event) => $setup.setActiveTab("recommend")),
    c: $setup.activeTab === "following" ? 1 : "",
    d: common_vendor.o(($event) => $setup.setActiveTab("following")),
    e: $setup.isLoading
  }, $setup.isLoading ? {} : {
    f: common_vendor.f($setup.currentOutfits, (outfit, index, i0) => {
      return {
        a: outfit.image,
        b: common_vendor.t(outfit.title),
        c: common_vendor.t(outfit.likes),
        d: common_vendor.t(outfit.comments),
        e: outfit.id,
        f: common_vendor.n(index % 4 === 0 || index % 4 === 3 ? "low" : "high"),
        g: common_vendor.o(($event) => $setup.navigateToOutfitDetail(outfit.id), outfit.id)
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
