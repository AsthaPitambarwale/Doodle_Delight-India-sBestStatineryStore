const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Category = require("./models/Category");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

// ================= CATEGORIES =================
const categories = [
  {
    _id: "1",
    name: "Notebooks & Diaries",
    slug: "notebooks",
    image:
      "https://inkarto.com/cdn/shop/files/Untitled_design_-_2026-03-28T122428.624.jpg?v=1774681891&width=1100",
    productCount: 45,
  },
  {
    _id: "2",
    name: "Pens & Pencils",
    slug: "pens-pencils",
    image:
      "https://spartexpen.com/wp-content/uploads/2024/01/Export-Enquiry-Banner-Image.png",
    productCount: 34,
  },
  {
    _id: "3",
    name: "Art Supplies",
    slug: "art-supplies",
    image: "https://m.media-amazon.com/images/I/81qQrGur9QL.jpg",
    productCount: 40,
  },
  {
    _id: "4",
    name: "Office Supplies",
    slug: "office-supplies",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjksf_lieSRc4EbP2dIDQdx4JkedMgIAS5Mg&s",
    productCount: 82,
  },
  {
    _id: "5",
    name: "School Essentials",
    slug: "school-essentials",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbcVJ1Y4y51pwnWLIS7qWCVuEGGfrA9iGOVg&s",
    productCount: 96,
  },
  {
    _id: "6",
    name: "Desk Organizers",
    slug: "desk-organizers",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRhfCaJXNS89hDS-xx76TApz_JMVMAYemm6Q&s",
    productCount: 25,
  },
];

// ================= PRODUCTS (33 TOTAL) =================
const products = [
  // -------- NOTEBOOKS --------
  {
    name: "Premium Leather Notebook A5",
    description:
      "Elegant premium leather-bound A5 notebook designed for professionals and students. Perfect for journaling, notes, and planning with smooth premium pages.",
    category: "notebooks",
    price: 899,
    wholesalePrice: 649,
    images:["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTKlD4OotJ8c-li44k1WhgHebjpieBcbX5k25giilbZPVeNEmZ8vznBMRWqhxDZvcmWVjvOfy5bpcjij3Ld-e5aR0ctL0qrL5ESn-71QyplUqR39E78V4BkPskM","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQMAn3an95OVA7H-mUe5IqEpKPlIY9UZz1avAHT7E7mKEBS2Xu-F9YPJiVvA9WSvMB04QzIq2JzWG5gOckQiQAndcotQaUknM1Z_VFqlLOc_PF1PieZmMVazw","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQJ3x8M6Dv6prksEGkzM_lbL9tqwY_D_UpXPwy413okLPawY31vNklhuzPwdrdNe-dDM-cwzb2zAXmT4GHFgSpBrJz-MBtyBt-GqbNiPXdd3LNL3Y_nR4EB5A"],
    stock: 45,
    brand: "Classic Notes",
    featured: true,
  },
  {
    name: "Spiral Notebook Set - Pack of 5",
    description:
      "Set of 5 spiral notebooks with smooth ruled pages ideal for school, office, and daily note-taking.",
    category: "notebooks",
    price: 349,
    wholesalePrice: 259,
    images:["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSp7UEFSsucvgrW265wTLQpbnRyHL8moKolsj-dxOx3BpiD_2G51OCPyLAOZU5nmy5xKFpcRMp3Eia6XMIBUWkjJFVklFEhjFyhEMxjoAIf0EVV4kUAuMAKMSrQ","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS_LrQeBLcvFYSWYTgh7ydzqUIsY_QSX2GgmcWmo2732CMAmhXj1hfScn9N__uaAuZJvScqo_9o3nR6FWIauUxXb1v8iwln6mXCrrsuH5KwCMPfEyyqonR-A6Y","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2UwkTNeCFJqLrGSzdfk88-CyT1C8PNeZ63uhbprfZWEiG5wBk5xI9wgVVXhraO5ksQmojJlcZXdpBRmi9JUShtBqQPGgDDRyQd-Xba1fZRmm5K2789CxH"],
    stock: 5,
    brand: "Classic Notes",
  },
  {
    name: "Hardcover Journal Premium",
    description:
      "Durable hardcover journal with thick pages designed for writing, sketching, and personal journaling.",
    category: "notebooks",
    price: 499,
    wholesalePrice: 349,
    images:["https://m.media-amazon.com/images/I/71F34KDzTZL.jpg","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQEuDsjdhnLJpOy89nSe-dWzSit2D_UmbXoWb8XmdKlhfagr7oL7e1obvRczSLw5KnkukrrA-p7czvAGLIjVVa3_GdfhW0z","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRJtnvw-X1qqa7GkRnxztbJhHIGfJZDbRT2Gx-7KHTB-HvFU9XRwhILZiTZbDNfvBpIAxvj-GCh-p8zVMf29UHQKrFRRlMKaqIRr7Dy0J6c"],
    stock: 70,
    brand: "PaperCraft",
  },
  {
    name: "Ruled A4 Notebook Pack",
    description:
      "A4 ruled notebook pack suitable for school and office use with high-quality paper.",
    category: "notebooks",
    price: 299,
    wholesalePrice: 199,
    images:["https://m.media-amazon.com/images/I/61Hk42lHtRL.jpg","https://m.media-amazon.com/images/I/616tNc0IVlL.jpg","https://m.media-amazon.com/images/I/61UI5ZH1RLL.jpg"],
    stock: 120,
    brand: "StudyMate",
  },

  // -------- PENS & PENCILS --------
  {
    name: "Gel Pen Set - 12 Colors",
    description:
      "Smooth writing gel pen set with 12 vibrant colors perfect for writing and creative work.",
    category: "pens-pencils",
    price: 299,
    wholesalePrice: 219,
    images:["https://m.media-amazon.com/images/I/71xEFZ-oPxL.jpg","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRl0hOfhNw1xORZuMEXLP2q7qdzrV1iQUBWUYGuiZpN4I4wnHW5OxfxYtVxIUKXXh6Bh216zZABH9szeMkKWHvB0QULdgknD0UFwS8u7v0","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ5CFuTg7NxGs53vuhH-lyo3xa05_Kzq5ZV7u9667QyaUk4g2q7kFaRYvWuqzteVnyzsfPyTJR-bKRJhJOF46HS6A7f3N_mjZuWLYAvLPiE"],
    stock: 120,
    brand: "WriteWell",
    featured: true,
  },
  {
    name: "Mechanical Pencil Set",
    description:
      "Precision mechanical pencil set with refill leads for drawing, sketching, and technical work.",
    category: "pens-pencils",
    price: 449,
    wholesalePrice: 329,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAn9UeV3c5voQ7qacoddzNNGdBXLDxqZFrCDH-Hi80fmiN71aQArfWttCNz4YNBZDZ7FrGJp0spE-LUlQPQ5Cf-4KcgKwHpDOzwPuTCGT0VQLiplY1fJ4LyA","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTl2RLP6Gu0A4MW85xgB_UedKNM8mvRDspMznB2-ucotl2gcbs8Hm1sqEk6VNAxEm6KmOpiJlpH50RrIr-W0VwAnbBBkrtzasfN-v4BXuzbwIa30QF9SPFb","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRa-TwyaNXC-HzIM1k6SmeMjMka8I2EzXRQea-xLtR8MrV51tFZLwTtWnWek8xKuvwska2EdCaNamDIG99mvZnC7HvOR02hBy8pgFhFJ4-ywTQiAlyYU92s"],
    stock: 88,
    brand: "WriteWell",
  },
  {
    name: "Ball Pen Bulk Pack (50 pcs)",
    description:
      "Bulk pack of smooth writing ball pens ideal for offices, schools, and institutions.",
    category: "pens-pencils",
    price: 399,
    wholesalePrice: 279,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSG8nHHo4ytLhVouhqBN_yrJtAz1vrLRi6YsI0Tx7v-soAmR3WqwM49sEHso1lVNYAEiT9y6QMiPjhNEK-soPsGUwF7Z2LGVmxc_ER5sg1ZoGigesbt2gT1uOY","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR6DEAk1f8It41F-U3z00S-qhUGr6E4_iHvIKFh-63AQCbFXZQowlVM-ardT4Fxd7TaUy4wwZHzD60KjoU2arTQwaTDe4XNBzbrSWj1DFX1Ya-vHkuH5VlWmQ","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcStp_tjvnjFpSb9rD9er0nX3aMeAjhWNbL_HcHvOrDi-IStvpjYkHpGOVVu2eeo8wpkNyV62VgViWjsXrPCdysJVso_C8Dk"],
    stock: 0,
    brand: "InkPro",
  },
  {
    name: "Luxury Fountain Pen",
    description:
      "Premium luxury fountain pen with elegant design and smooth ink flow for professionals.",
    category: "pens-pencils",
    price: 999,
    wholesalePrice: 749,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQjzBBspCP_n-FXzD5RemRQfm2qidpsHz9XVK_aEfkjhKmbSedupe_Q8alXocL32f1i_as5Zs50VQTtdPOsjqnvpW2uEbNXoUGqWM0JVDydxe_9giISR5dQfw","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRsWnRy4vGoCwUfZMoER4Fcr1HlvlcVrTsaHN4mblXM6oHXnO_FWAv492BVx3I-M_9usrYUyzhnXw4LiGrmtxv7W5HZwmtX0TT2anI9JF1tNIKJhaliG9zZFw","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT4OJlfLQKGDdUM8MzQ47CZ4m25UjJlOOozrpdAkb_iYzUFsCk3jj4g082X0u_EzYwhPSxKFi1nZOrxp4E3YCSriYx22_7jxtSPBidpEmTF4Q3btT42qGzx"],
    stock: 40,
    brand: "EliteWrite",
  },

  // -------- ART SUPPLIES --------
  {
    name: "Watercolor Paint Set 24 Colors",
    description:
      "Professional watercolor set with 24 vibrant shades for artists and beginners.",
    category: "art-supplies",
    price: 1299,
    wholesalePrice: 949,
    images:["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTwfWo1xze7xBnzOTP1gkDtpEqt3ix0A2IJNgA4RVlQa9nd11whFhkWrNx_pzHP07f0YT88_0yLlkpfDzsaGIcPjlk3rAit-QLe5_AuyuoRTuNiPpb85LIKog","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSxMM8cs-qnMNqSNsS3js88e2xUgRFlDQa4C98AIXruOcNJGSsc-ZlxZ3mMSUsvFkvzXwI-IPy3LpgZEuYxXXVpdp8s4KqedRwriMYBtEkacG3_4ER_sxcpww","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRqcMmPEQSyETle3UDl4FkKH59dPVGaBTMr-hFJKgscEMzLV8_vAcAQan1z9GYUEIGBgz2p515KY9msjcm2ZZMQpq6vCShnQ7n7QyxLcjIursmn4JOOEcNZbA"],
    stock: 35,
    brand: "ArtPro",
    featured: true,
  },
  {
    name: "Acrylic Paint Set",
    description:
      "High-quality acrylic paints with rich pigments for canvas painting and crafts.",
    category: "art-supplies",
    price: 799,
    wholesalePrice: 599,
    images:["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTXDe7TF8tAMAu9K7AwITgIdJNv8QVAjYv1o7P5cNMCRjb7oNS74GFVB1oZjBl5kaEBZlmItdwNbhpB_95q8O5ZA4CyiU0nAdsDyZDX6gfeelWb_WhGifXB","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQTB1TrEf-GIsW6f-4Pje53eBF2x7dNUAmfPzcJ1iuMcB4yvKpE2oo_2LEi3XoI8LcdW9fNcwr3-mCAfnvjKYP17zif9oCSjRKO8JnMRkGuDJ8u8qArahJWrw","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRrt4R2aDNFyeEz0GnN0GVxt1HQSfUK17iUsTJVy900FCmu3peVxzc6ImpXamqfj-j5AFzdGqVfGWrka-JNLWY7EhrfxX_SHRk-EHjCN1c1RlzKIVjYWdVnPA"],
    stock: 60,
    brand: "ArtPro",
  },
  {
    name: "Sketch Pencil Kit",
    description:
      "Complete sketch pencil kit for shading, drawing, and artistic illustration.",
    category: "art-supplies",
    price: 499,
    wholesalePrice: 349,
    images:["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmT79M-xEytdzNJyA58xSXpmk_P_uCO4abXCHCg9P0uOpaNeb5sn44FnCvWWFqj9Zv_6u_s4JWz4Vhk_q-OijvMV1zpan4vukiJytiyF6a5VCrfWCDvqQcdQ","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRkE3y53y6qdEf1IPD_SseKeeESgbpTM6Z3Epz6-615OGjzwLd7q31CPXT9ujCCUjvTLQ7xcUJ2jjWYn21hFITab5gvQ6JptP_GZTRmWIq7f36d4b9zp3H-dA","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQkD4Otl8qontdZzqJPSkWAvF1Wirah0QKYMFDzEu8VTT8DfB8hx_TsSBo-GJPkfMvzfggn6rhMMYvUNDc5MlvkZZs75kGDcn1-iSMQ1Cbe3iSMnLVMMwR2"],
    stock: 80,
    brand: "SketchMate",
  },
  {
    name: "Oil Pastel Set",
    description:
      "Soft oil pastel set with smooth blending and rich color output for artwork.",
    category: "art-supplies",
    price: 699,
    wholesalePrice: 499,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQWyQlnnU4xcs-O1ftJHtUx4ckcwmgyQtPzldOZSnDe1n2Th5z1IpEsT7p3Rgi8khivcI1ZvRgIn6Fcihv34xvi1J_MTx_5MEXAc5fcwpfaP81Jbk5CzGQXEQ","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRLw1Nhp6ugQfzlifiQLEJMv5_G2u-JQcJdxKNm7oIzpB5iw-9y2zSaSMXTnMoxhkt7wy0_QqmxdpsEFN3QlA0ibX4-ZJYvphpOpdSi8PCR88V7oBB61Jsq8wbE","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTbvUraFZp7GuGZMz2_j3l4jSFB8XhOFGeBx2cop_5PXtVIonZB39VMqGR-CD0U2l-MOMoA9KQZ1IihwzfTH9d3qzN3yk3Ogwk6Ry-zL_LObM6oxBfishN9_nUy"],
    stock: 55,
    brand: "ColorWorld",
  },

  // -------- OFFICE SUPPLIES --------
  {
    name: "Heavy Duty Stapler",
    description:
      "Strong metal stapler designed for heavy office use and long-lasting durability.",
    category: "office-supplies",
    price: 599,
    wholesalePrice: 449,
    images: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQnPTXt74tyAn_dNenbGFkrtu_cpvPPQgx72QTrbBZd_izs3ub45WDvI83k5teTccaBnccv_kbvvzVFlO66OivGk8t646hWvcJJIRdPQ85tAzU7hFiRy2g","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTeEcCxQaNCycYt7aD0YCntEdrs6sHhik4jcT79YNuopBo5WyGnAzSqWQo4etjnW3SoEDP1ncQsFv0emBA_uUfCn9KJHNcX99EzU72C3JCu","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTWbfjozrPzNRlLiRk1x_RNqKt4qJ7JEm_bVWICOB5HkN1lhd9UuzjBfQbuoYP8vZU6-EbxeCS-jhmIZV_0Ied6LCJRti-7AUxF8hKoqvyBwyT0RVX9TFJNnA"],
    stock: 78,
    brand: "OfficeMax",
  },
  {
    name: "Office File Folder Set",
    description:
      "Organized file folder set for documents, bills, and office paperwork storage.",
    category: "office-supplies",
    price: 499,
    wholesalePrice: 359,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ4uFgKh-toQVfp0zvfs3VJ06GCOLPSKtnAThbq4CfvfZAWBuHnLQa5LlEIP8HJH7Dh_PmQFu0AKm0L5Oh9AEZnP5CyQS_p3O88NRVxF7lq0DO7g__mXJbS","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTz70kzp-OHCu_m8GlQjBS7DlRN216mSCKmmEBhlRJCEyoRSYQ1DHDYRdvQwn7Ure-xVdQ33iAmCqRTolHxcC_p6spK0gG9BNEfYxFdLUc","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRrhOvVKkIYA9letKej-qwu122z0eCrcloMnOrEzucAaZNnqROb1woS3FfxUR83xAGRLGd_hOdmqAykz6z0chBsui-WiVHaVldTV4f-5K2a"],
    stock: 110,
    brand: "OfficePro",
  },
  {
    name: "Desk Tape Dispenser",
    description:
      "Compact desk tape dispenser with strong grip and easy tape cutting mechanism.",
    category: "office-supplies",
    price: 199,
    wholesalePrice: 129,
    images:["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQvCRJ7BJKLkw6dNLy46ppHl5p8EAoRAV5bH4hM3ORa6Ha6wM22Mmy5Oq8w7n_5dpJ0qMrVA1Z00fdi5MTm0sTGoCk4w5WNXQ","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRN4WK_xz1dRcMv1dWzVBrY5U9nvOMgEkpt0xToEcIVS55-fZ1C-j2mjAptebF_qTU5TWF3EgC7m8sk7wQ2MMys1NWpwfNXkVj_WrYM3BHVWWP4Mr1Z0ntW","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRGIJyDgDgh2fiKjECQ9b2tk0gMbV-yPrYHH8flm98yDL8iaeB0mQ1vxNR9GlqKLXHx4VPQcECryh3Z9J25TDl9ySx9v5NMKuxBvWQDJ-YNfGM83wO7m7rp"],
    stock: 0,
    brand: "OfficeMax",
  },
  {
    name: "Whiteboard Marker Set",
    description:
      "Low-odor whiteboard markers with bold ink for clear writing on boards.",
    category: "office-supplies",
    price: 249,
    wholesalePrice: 169,
    images:["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQM5AFIzN3f7DSWARhNBypC5fCOwFN7aaorMK2_YSe3S5U1slyDNje74eVPtBm7S635FQyyWrTIJmND1G8C1FlkGUMV1tkPn3hJMVP0u-1fXvlrXLA2fb1eF3o","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQGwHJamZh14G_C0WPbBmdRN1v-fNqT4rKoIEev9406ncvIFNBRyQZtw4G93UBk_04rej1Vhav72uFiBWkXSNmxAcPLANd-e49KvBhwEOU0VoqG_fyCnD1F","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRpj7jBNuJUi7f-v5UsG7q3Hjy63RL9m_PfgQMJMfV5rdb-HTHm7mDpU-ls-1-7SyF2QkTWPvfLkWKW375jLq6byDin8CHnL1PQfz3fqvr6fGrl_fP-qej-LbM"],
    stock: 130,
    brand: "WritePro",
  },

  // -------- SCHOOL ESSENTIALS --------
  {
    name: "School Backpack Premium",
    description:
      "Durable school backpack with multiple compartments and ergonomic comfort.",
    category: "school-essentials",
    price: 1799,
    wholesalePrice: 1349,
    images:["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRyQr0C0ZZnoZT7fnO0imZQuDDR0Z5dPbb9uoNEOx4DVu6J4SSYSlA3my1hRHK8NCohn_W7r1_sh_5PUWvfYVD44lyz_QQk4_jvd_w86skH","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS-vHP1_sEm65sVq4z_CDPmP_DPQLoF9HgAFZ-LRp_NaD6OC3JLWnXOKdJEwfBye3jBTConYFnOfSu7ltEfLP3MC0UsggZ-Rt-bi2M5T6byb5gyE4Yyv-NY","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ7DiC60Xn9L9bCgUC0j3xOJPuFe4JyeLPaajDAkWe_uQDiMpBC90pmkBvXaWLkrguriyJmU3kr60Nm1vsjGljdG8KuPX6Epzj11pbbJaqw0Qn9acyLWfWb"],
    stock: 62,
    brand: "StudyBuddy",
    featured: true,
  },
  {
    name: "Geometry Box Set",
    description:
      "Complete geometry box set with compass, ruler, and mathematical tools.",
    category: "school-essentials",
    price: 299,
    wholesalePrice: 199,
    images:["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSGfhYOCQbaGg0a7BRbOkyc26VyqUmK9_v30BZmxt5lPS3wZKvZLydDAhIF3gunzlNloVcSe7r-Fjl9U8m1crG0rKJFUhaHGfqayjmKB1fDyNRS3BHVKBOEHTA","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQBBEYMg08GzG77RJ2blJIuj2blQjqw-oe01O2tCpaGRs3ODlag5GXP9opY2jbAdAvuzYd-rImx5KjDT_qZqyrPQ1MAFVVcr63y7qTHALszALeIhJbiBlKlsuY","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMEe2F9qHwILR7EbUzt1I8oo50szyfsF3E1n6czfTX0Co3aW5bRQ98x77t0trPnENEQRDeSU-e8qHDhTQyGrm-irNo6IXhoDmsQyb-qfuic9Df8iXpJLD0LHE"],
    stock: 140,
    brand: "EduKit",
  },
  {
    name: "Lunch Box Combo Set",
    description:
      "Premium multi-compartment lunch box combo set designed for school kids and office use. Leak-proof, durable, and easy to carry with insulated food safety design.",
    category: "school-essentials",
    price: 499,
    wholesalePrice: 349,
    images:["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQMrjF1BCsefy4N9SaTkYdH1nLyo3e-ZSlTrsuJs9z7Blv8KVHQUjGM4pYsedEBw8OlcxnT1cmfDXNi1tFAKC1IvTkJU2lb-35lYTEZodOjUOrFkIne5jYtpg","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTj91k5ICd_4duclt8-lUljoXbGVQ-9Ftmlm5aKR2WenFyFTxUOSiuw8YG6PuWsLfirVI_2XA0GT9Uugu8qVu7Cl8G2Tz0tkkDXYtkIU2lEKN5FhworOcTiFic","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ766VDtXBwJZB3Famg1tKDUMZYUVD1BRNz5u2nE_L-aSQ7Yek1LH2_RnEbSJ5jOe4Co4H6HCNC2aVQDBEeFx4UxsNsq_xDLDj6hN1L78fJZdOY6FyY0s2I",],
    stock: 100,
    brand: "KidsGear",
  },

  {
    name: "Water Bottle Stainless Steel",
    description:
      "High-quality stainless steel water bottle designed for long-lasting temperature retention. Leak-proof, lightweight, and perfect for school, office, and travel use.",
    category: "school-essentials",
    price: 399,
    wholesalePrice: 279,
    images:["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT1SZ6-raslDw2QCMnX77zJJtFIQ9NOreC8yaWhSecKnpel8sqAPHuKOjIi035cyStb6pBsZBnKtLtOXkzeHTrJGUO09HBN","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTi439bCuKZaPyfjIiaxxl_9YGZ3CZC4gR0ZO_h53Wbh5L2ubGDAviSg0-pxzNudA2ZWdH_mUj8GrY8oFtwSeGFvpuYaDRfC02TqCwJ2cTN7Hc6gxy8IKmWZA","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQHLWJkz1jUBcCLyqktckm62orT6_HcdROivsgHlEEWtAKYWIWdPDyQJ429l7_NNcR8Rh6zr83iYDrOztfi-iPnZp1o23NU88ncak6wndCA5eYC8zysZMPE"],
    stock: 130,
    brand: "HydroKids",
  },

  // -------- DESK ORGANIZERS --------

  {
    name: "Bamboo Desk Organizer",
    description:
      "Eco-friendly bamboo desk organizer designed to keep your workspace clean and structured. Perfect for pens, notes, and office essentials with a premium natural finish.",
    category: "desk-organizers",
    price: 799,
    wholesalePrice: 599,
    images:["https://m.media-amazon.com/images/I/81wEi5JSztL.jpg","https://m.media-amazon.com/images/I/71g+gdWtp-L.jpg","https://m.media-amazon.com/images/I/71-XmQID0CL.jpg"],
    stock: 43,
    brand: "EcoDesk",
  },

  {
    name: "Multi-Drawer Organizer",
    description:
      "Compact multi-drawer storage organizer ideal for office desks and home workspaces. Helps store stationery, documents, and small accessories efficiently.",
    category: "desk-organizers",
    price: 999,
    wholesalePrice: 749,
    images:["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSxV-CeFVaUaNT8hx9DLWHOMZCAsvGJBm6SRRnRg6v4ZBbBcuyUIhgoi5nDSoJTkPO3Rk7A5kF0dCkSHPAv8NR98o7esucVTNlba87qW1qsGb_53BJkr5CB","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRcRW4Z-lAkwvJMqldblPNwE853t5njxY0OuhdgsgaSiQ8yZuvUS4cJ8kKvunZQN5kbxpGh4T0g6elrWKbSiF5UcTFJVOSJ35JUoLtRhHdd7IHLYNxaUzpk","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQphQubIvWkBkmNyBK393yxgBT35XPKPZRJLFr8DB0pkoDJTeuRwGiYLiWhybc8YIdXWWFqqulZgtyhkytFPvAAI05mCd4gLMrEG6kn25kv"],
    stock: 0,
    brand: "HomeOffice",
  },

  {
    name: "Pen Holder Metal Stand",
    description:
      "Durable metal pen holder stand designed for modern workspaces. Keeps pens, pencils, and tools organized while enhancing desk aesthetics.",
    category: "desk-organizers",
    price: 199,
    wholesalePrice: 129,
    images:["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQrQ95SSzvSaUMdHibetAyaij5R7OVpWp85W37WBPCM4pkbS-oBVe6ZKL7w2PWCpO-TUJotLUbpGZBwb9XqE5ZEExEepHVRfklkj1I-HHuxacYAIZwXT_vL","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR33HPVRJG91ksV3FscbQLno8d82RpLyMZl6GEVJG79-dKbRFVHA6MC93Sbd_5cKzUB7_Ad4whMfugsFeg5LgciZIAQUO1qGcuU4rJwCep5MYX57z53tpTsQpc","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQta2dvkfOyUUPBn9L4_dDvMcsWo6FYLyaSJCgFfRAYZ8lhAvQR07MXLQiMBIGI6JiOKpYc2_Grd5Q5nbjNYDAX_SWVWJMIbTcAf0O0j8E"],
    stock: 150,
    brand: "DeskPro",
  },

  {
    name: "Cable Management Box",
    description:
      "Smart cable management box designed to hide and organize messy wires. Ensures a clean, safe, and clutter-free workspace or home setup.",
    category: "desk-organizers",
    price: 599,
    wholesalePrice: 399,
    images:["https://m.media-amazon.com/images/I/71vRnTMIoLL.jpg","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTM6mvdGmcGdJt6rs17mvbaoZjTnedRMY4V1zb594zBzIvSlZgx6Q_hJIuxOJJBx_IsPQw8q91U4EDvO72xStGst6bQQqFkovHufWZq_eSQixwiUBXv_zZNHw","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSjd5NHhqbzUtCH0EXRxj6-bFrgBD6WCSv_8ytUF9arUATL9iCOCCyvGF9UZYQaTHE39tNEhoSMlz70vDZ2eI2l0McbXXy3IVE0G-8Gx0Xlip_LQeLwXtXSDQ"],
    stock: 80,
    brand: "CleanDesk",
  },

  // ================= NOTBOOKS & DIARIES =================//
  {
    name: "Hardcover Academic Notebook Set",
    description: "Durable hardcover notebooks for students and professionals.",
    category: "notebooks",
    price: 499,
    wholesalePrice: 349,
    images: ["https://m.media-amazon.com/images/I/71DoFIGBZCL.jpg","https://m.media-amazon.com/images/I/81jgwKun6TS.jpg","https://m.media-amazon.com/images/I/61hMD8PeFJS.jpg"],
    stock: 80,
    brand: "NoteMaster",
    featured: false,
  },
  {
    name: "Vintage Journal Diary A5",
    description: "Classic vintage-style diary with leather finish.",
    category: "notebooks",
    price: 699,
    wholesalePrice: 499,
    images: ["https://m.media-amazon.com/images/I/61OIbtE471L.jpg","https://m.media-amazon.com/images/I/61OIbtE471L.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg","https://m.media-amazon.com/images/I/51exw5HG+-L.jpg"],
    stock: 60,
    brand: "Classic Notes",
    featured: false,
  },

  // ================= PENS & PENCILS =================
  {
    name: "Apsara Pencil Set",
    description: "Premium pencil with bright strok.",
    category: "pens-pencils",
    price: 199,
    wholesalePrice: 119,
    images: ["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcShJmdGIa0z1SISEscHgE1dLtarT2VKvRAnX7Em8HlTgWEfbhrLQ1tUeleYLU45R8dQMp0LbjuHjRaFMGglj13Rm8ajFl8qWmyn1dW4ZrNoUG60CI2hzW39","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ1zqqFyiLLLsTaIF4HmKZGizCIztxX72qLNafLz5-pkjqEu4ZlLRHtXjpRYH4AnxRjs1-RrLSTIl1YT3jPE-fwZu_2v6A7F9BlBQTXC0KMmP_KWKUTuQM2LA","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5l5b6nGY6avD6xtEd2wuZ_aIevrzTtpc4onwSiSNtO-6z1zwubQaEnWMiyjJFCmRw7w372mT4N3CygP2GPmyNtH8BETYpjNfafbmiWBenpR6T6E7Re-Hv"],
    stock: 40,
    brand: "WriteWell",
    featured: true,
  },
  {
    name: "Color Pencil Set - 36 Shades",
    description: "High-quality color pencils for sketching and art.",
    category: "pens-pencils",
    price: 599,
    wholesalePrice: 429,
    images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRbxVoOt1l-N0dplQ4b-TbydvZ9rtPdGlFfOia3GI11QutTVBtuKBsYPjQLTAJvUCCA8YlWTy3YaJQfTQv7da1H5gbwOVPXMGBAOSvbO-_lDHrlpW9rj9MWjWg","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTBFMoXHY_Y-ztmJvoXEZgRPUnQGlKAtser_0rjQ_AYUNkueToXwiqZwKJCtmcB7eCQ4JFxKik6PwxsJ7ybB90qFIihZAx3AbDEsI2V57wXP2bFvvv225Yvt98","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQTz104JyKRXup_jrpMh-f2263mbcGOSh6YIUsTHu1adc15hzh1o12F92EaIG_uDBaqFo2ARSJ7bCglSicUO6kxDEoqyVRUDZzyetsOZjLnPO-Q4DUpwAD7lh8"],
    stock: 70,
    brand: "ArtLine",
    featured: false,
  },

  // ================= ART SUPPLIES =================
  {
    name: "Artistic paint Brush Set",
    description: "High Quality strokes Brush sets",
    category: "art-supplies",
    price: 899,
    wholesalePrice: 649,
    images: ["https://images.meesho.com/images/products/325329331/e19uh_512.webp?width=512","https://m.media-amazon.com/images/I/71+sTpIKPLL.jpg","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTesrO_q-mzt_sL3nvopUZ540buxdkjFKwGVN6gXClmHQ2cbqLKFQIlcSJA3c8eu5xmyhkBO5csEH1XjRybXVfP2htFpkwQ0A"],
    stock: 55,
    brand: "ArtPro",
    featured: true,
  },
  {
    name: "Sketchbook A4 Premium",
    description: "Thick paper sketchbook for drawing & painting.",
    category: "art-supplies",
    price: 399,
    wholesalePrice: 279,
    images: ["https://images.meesho.com/images/products/455186441/oyqqk_512.webp?width=512","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRNtObF9tXl0i1R3qf4j_9HIQlWkw_VbD8pq7YlPHa2s-YpsmLLj5KaS_KfMrvpRIeBgQ2RiaP3GdaJLTN1HCexickAgevx_9yjM4L49z2cE8pPnk797_yg5w","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRnnO2-Rc21EyjhFlLVBdMBAoQUBKFIeNcwm5j-isBx_8fQwcOqF5mTZgC5wB74CBBRZXd2lxRyVadXUqBdIT9Fi2dxHPQJU-pj_GxAuz7imFT96bkn63-NifY"],
    stock: 90,
    brand: "CanvasArt",
    featured: false,
  },

  // ================= OFFICE SUPPLIES =================
  {
    name: "COI Desk Organizer Gift Set ",
    description: "Sticky Notes, Memo Pads, Pen & Note Holder for Office, School, Home",
    category: "office-supplies",
    price: 299,
    wholesalePrice: 199,
    images: ["https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQuCPfN23pXcb8bzdBZzLL1vb0sPtYwatPv4JymihGmc2P7tKq7hwpeK1H1S4y98JMi6pySrnbRZVQ-PCidQtKorFTEykt6lGgmJHkiOym4QVInJ1bN_J2OEgA","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTcyApAEZYAQyuFauvoTGs62UtzKJu82_kG59DbvjnME3srhBRFnf1ZbSgq3LzMdLk-aHUEynYDr8ByyKo3K_ipfmScxo_AEffAnzjhA-vb_wRuY9CJJXdXYA","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRc9oi28wZp_pI5bBZJw6G9_tK-P3az4xXd40PZwLNxR6kYYcy4POlpSTRHaJBjnKUpiUBPU1-0_HoGAV-yZEi2XV980NNm_tkNL8bgy18JeGarqrqRTDbsTA"],
    stock: 110,
    brand: "OfficeMax",
    featured: false,
  },
  {
    name: "Paper Punch Machine Heavy Duty",
    description: "Strong metal paper punch for office use.",
    category: "office-supplies",
    price: 799,
    wholesalePrice: 599,
    images:["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQMuKes6XI5Re4ujc3Fm3auBY0gRnCcBnExi_tfp-ZG3cd9VYUS377cLNEhHX2ZNdBm9Xpsefq_DFnh2TAtLbE4PFVKdkAhiArH-sUXg6iFw22wUh6OfqK67A","https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT_uNQdAWxnI8vwlswLDYEUbSHQSpsCjAblfQ9Hgc7O0irNrhwSS11GzqW5pvGbHZxhuXYOd77CoqBjm9-_XkXVWI_aaIhQRmTwN5hHTb9hnKi6RZGeTdkBKg","https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTqHfesUD9v3ju_qgoowObIlrjZzL21FK4C-73xrLE42IbxoxGCZpyJ7l8Wr4EZ6u3rlZq9Z3fUWdLlDw3-dY0BMCnmU_S4EDKXtlI5uULF3B26jwAqpQTQ-Q"],
    stock: 65,
    brand: "OfficePro",
    featured: false,
  },

  // ================= SCHOOL ESSENTIALS =================
  {
    name: " Cute Aesthetic Pencil Case",
    description: "Large Capacity Multi-Pocket Pencil Pouch with Zipper",
    category: "school-essentials",
    price: 249,
    wholesalePrice: 179,
    images: ["https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ0A7faAxV8FZ-UhhaNKDbkVcylIg7GFsNeatjjqqRMUok01WTseYZeuUif8SNMwmUON30IuMsJVcH3uH1JyNgs14q4c4YJdw","https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRXc395dKH-_DpcxF56bfCyQaISHzT-ZA7VjYh7sNC5YCSUcwqS6hC8Bg4ceJuPNVw7t8e2VsHGQmGzOCkEiPmTMvFtNQpaeQCXeh2ZWEzu","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQ9JpO9kcP3kr_d7V7y9ATKona8REaD_QdFcx6mvkfqXciJ_SSEXAZIXveq3rNpe_CDJlF1pb_hIKjGgvaod7hL6T9zVQyz4dgYSQ29ItjfSeZ8i5vp6vZrTI"],
    stock: 150,
    brand: "StudyBuddy",
    featured: false,
  },
  {
    name: "Lunch Box Stainless Steel Set",
    description: "Leak-proof steel lunch box for school kids.",
    category: "school-essentials",
    price: 599,
    wholesalePrice: 449,
    images: ["https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTsl8KQOdFsfKlmsm7hgg83qt9NV_3Qh2T0JJ16x4SYx4YdoYFKXGH4NW4I4KCjmMN0cQC0OrmKAZ7Py2meJOg5zTKRz1ZwXiX5xanGCMMK_Xt_IpPipb6b0g", "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSf5Po_APYUkZwLGNnKLEfsGN6JoDaSeEHdCfpROHToTXCTjgCc_Y9nutO6bqA5uzX20_8mxEAsUtexzLhkyyEEOx0N3r2iBhH0uK3Uog30YIjP5FOIA5-v", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcST2CvMG71EnikJwBH-F_9gG6fzinW1LHh8GWYrio_zQoXzMzMmH9EbqwW0koON485Pl0wtViyTCLEJ6HQVNHkhpeXBdBbLHb1s3YG3znYPJCZj7EQIjoEu"],
    stock: 85,
    brand: "SchoolMate",
    featured: true,
  },

  // ================= DESK ORGANIZERS =================
  {
    name: "Rotating Desk Organizer 360°",
    description: "Multi-slot rotating organizer for office desk.",
    category: "desk-organizers",
    price: 999,
    wholesalePrice: 749,
    images: ["https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTgwERzD1xy0fJG3QQTXDQNv74X7Wp8W3yMw5NkxZJ86FphXdSjunlgPZXIUmtQ-Zz5w-2vow5MpBGzjIITi1yY0N2OhDWUoR6jYg-66Ihk", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvCgcW717NAyB1JFFAq4G3WAQE7P5yNCps1-q8MgiLT5rkXqYNnnPOSz9xjmoAiT8fyRAWFRWOvmjTGvki22CgSjkUcChWUsvDT0lkjNrcqstjuFay7Dc37g","https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR8lLdC5AiLGnq2GVTgE6rSH8TsxgrVM7MOlopPTVwfA_9dZh8nMQBnPCevTgRFS42qlcuUFYhHXIh0JGhFHglQkWiFnZCi3G5Z183DiAQ"],
    stock: 50,
    brand: "EcoDesk",
    featured: true,
  },
  {
    name: "2-in-1 Desk Organizer with 3 Compartments",
    description: " All-in-One Pen Holder & Office Supplies Storage for Home, Office, Study Table.",
    category: "desk-organizers",
    price: 399,
    wholesalePrice: 279,
    images: [ "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTvDo8BsJzVrAKopbQ99Fl8R_1AqSlDqu1hEalDhgFzzX9ihqEz9PrBEXk0AwCQvs7yH4Y6ZxzmaMX2sGvCWDpETJkcqyR77UmvOo1cIUW7x-eGM-u5uKlH", "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSsc1iio1p6PNmVTHRrbev75iIHcQ-_0gtPESDv5Z0kpsrO7FRtzXUDq2hieTFPrcRdiOpjgVWZvVvtnhd9wVWMfgs1w7deeKwquHZ5z8k", "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR16kXHS4KqKAkFZRKOeFTQu74S4bAhg_7qaWpqtQCNd_m9MxO5-eWi4D_Wnt8h_iL5ZtMOAKHaipcPl4MmrG9ioN2s0tjPjNficKyFIrI"],
    stock: 120,
    brand: "EcoDesk",
    featured: false,
  },
];

// ================= SEED =================
const seedData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();

    await Category.insertMany(categories);
    await Product.insertMany(products);

    console.log("✅ 33 Products + Categories Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
