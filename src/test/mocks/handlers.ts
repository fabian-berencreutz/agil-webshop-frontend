import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:9003/products", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "Testprodukt",
        description: "En testprodukt",
        price: 100,
        quantity: 5,
        category: "ELECTRONICS",
        imageUrl: "/test.png",
      },
    ]);
  }),

  http.get("http://localhost:9003/auth/me", () => {
    return HttpResponse.json({
      subject: "admin@webshop.se",
      roles: ["ADMIN"],
    });
  }),
];
