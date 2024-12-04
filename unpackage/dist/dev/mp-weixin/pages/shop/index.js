"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchQuery = common_vendor.ref("");
    const categories = common_vendor.ref([
      { id: 1, name: "上衣" },
      { id: 2, name: "裤子" },
      { id: 3, name: "鞋子" },
      { id: 4, name: "配饰" }
    ]);
    const products = common_vendor.ref([
      { id: 1, name: "时尚T恤", price: 99, image: "/static/product1.jpg" },
      { id: 2, name: "休闲裤", price: 199, image: "/static/product2.jpg" },
      { id: 3, name: "运动鞋", price: 299, image: "/static/product3.jpg" }
    ]);
    const searchProducts = () => {
      console.log("Searching for:", searchQuery.value);
    };
    const selectCategory = (categoryId) => {
      console.log("Selected category:", categoryId);
    };
    const navigateToProductDetail = (productId) => {
      common_vendor.index.navigateTo({
        url: `/pages/shop/detail?id=${productId}&type=product`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(searchProducts),
        b: searchQuery.value,
        c: common_vendor.o(($event) => searchQuery.value = $event.detail.value),
        d: common_vendor.o(searchProducts),
        e: common_vendor.f(categories.value, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.name),
            b: category.id,
            c: common_vendor.o(($event) => selectCategory(category.id), category.id)
          };
        }),
        f: common_vendor.f(products.value, (product, k0, i0) => {
          return {
            a: product.image,
            b: common_vendor.t(product.name),
            c: common_vendor.t(product.price),
            d: product.id,
            e: common_vendor.o(($event) => navigateToProductDetail(product.id), product.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7db6cc15"]]);
wx.createPage(MiniProgramPage);
