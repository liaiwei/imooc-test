import SvgIcon from "@/components/SvgIcon";

/**
 * 1.导入所有svg图标
 * 2.完成SvgIcon的全局注册
 */
const svgRequire = require.context("./svg", false, /\.svg$/);
//此时返回一个require函数，可以接受一个request的参数,用于require的导入
//该函数提供三个属性，可以通过svgRequire.keys()获取素有svg图标
//遍历图标，把图标作为request参数参入到svgRequire导入函数中,完成本地svg图标的导入

svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon));

export default (app) => {
  app.component("svg-icon", SvgIcon);
};
