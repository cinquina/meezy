import type { ProductInput } from "./db";

// inserted once, only when the products table is empty.
const IMAGE = "https://yeezy.com/cdn-cgi/image/width=200,height=200,quality=100,compression=fast,slow-connection-quality=80,fit=pad,gravity=center,background=transparent/https://cdn.swell.store/yzy-prod/6a7f84fcdb9a7000135ecd7f/6b2a582fb80d0a7dd4c0e6c690d6fcbc/image-1.png";

export const seedProducts: ProductInput[] = ["PD-00", "PD-01", "PD-02", "PD-03", "PD-04", "PD-04", "PD-04"].map(
  (name) => ({ name, price: 20, image: IMAGE, category: "male" }),
);
