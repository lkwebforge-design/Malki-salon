/* ==========================================================================
   MALKI BRIDAL & BEAUTY — editable site content
   Edit text, images and business details here. Nothing below is invented:
   only verified facts supplied for the project are used. Replace the
   temporary placeholder images in /assets/img with authorised photographs
   (keep the same file names, or update the "src" paths below).
   ========================================================================== */
window.SITE = {
  business: {
    name: "Malki Bridal & Beauty",
    altName: "Malki’s Miracle Makeovers",
    owner: "Malki Rajapaksha",
    address: "No. 107, Ampitiya Road, Kandy 20000, Sri Lanka",
    phoneDisplay: "+94 77 278 0838",
    phoneHref: "tel:+94772780838",
    whatsappNumber: "94772780838",
    whatsappUrl: "https://wa.me/94772780838",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=107+Ampitiya+Road+Kandy+Sri+Lanka"
    // Add verified social links later, e.g. instagram: "https://instagram.com/..."
  },

  /* Signature bridal experience (section #bridal) */
  bridal: [
    {
      title: "Traditional Kandyan Bridal Styling",
      text: "Classic Kandyan bridal dressing and styling, shaped around the heritage and ceremony of your day.",
      img: "assets/img/bridal-kandyan.svg",
      alt: "Temporary placeholder for a traditional Kandyan bridal styling photograph",
      layout: "wide"
    },
    {
      title: "Modern Bridal Elegance",
      text: "A contemporary bridal look with a refined, timeless finish.",
      img: "assets/img/bridal-modern.svg",
      alt: "Temporary placeholder for a modern bridal look photograph",
      layout: "tall"
    },
    {
      title: "Bridal Makeup",
      text: "Makeup designed to complement your natural features and your wedding-day style.",
      img: "assets/img/bridal-makeup.svg",
      alt: "Temporary placeholder for a bridal makeup photograph",
      layout: "square"
    },
    {
      title: "Bridal Hair & Dressing",
      text: "Considered hair styling and dressing, finished with care for every detail.",
      img: "assets/img/bridal-hair.svg",
      alt: "Temporary placeholder for a bridal hair and dressing photograph",
      layout: "landscape"
    }
  ],

  /* Beauty services menu (section #services). Prices are intentionally absent.
     If prices are confirmed later, add a  price: "..."  field to any item. */
  services: [
    { title: "Bridal Dressing & Makeup", text: "Bridal styling and makeup for a memorable wedding-day look.", icon: "dress" },
    { title: "Hair Styling", text: "Haircuts, colouring and styling for individual preferences and special occasions.", icon: "scissors" },
    { title: "Nails & Beauty Care", text: "Nail services and selected beauty treatments.", icon: "polish" },
    { title: "Skin & Body Care", text: "Beauty and personal-care services offered by the salon.", icon: "leaf" },
    { title: "Special-Occasion Makeovers", text: "Makeup and styling for engagements, pre-shoots, wedding guests, graduations and other events.", icon: "sparkle" },
    { title: "Bridal Accessories", text: "Customized bridal jewellery hire and artificial bouquets.", icon: "gem" }
  ],

  /* Gallery. "cat" must match one of the category names; filters are built
     automatically from the categories that actually have images. */
  gallery: [
    { src: "assets/img/g1.svg", cat: "Bridal", alt: "Temporary placeholder for a bridal portrait", ratio: "4 / 5.5" },
    { src: "assets/img/g2.svg", cat: "Soft Glam", alt: "Temporary placeholder for a soft glam makeup photograph", ratio: "1 / 1" },
    { src: "assets/img/g3.svg", cat: "Hair", alt: "Temporary placeholder for a hair styling photograph", ratio: "4 / 5" },
    { src: "assets/img/g4.svg", cat: "Special Occasions", alt: "Temporary placeholder for a special-occasion makeover photograph", ratio: "4 / 3" },
    { src: "assets/img/g5.svg", cat: "Bridal Details", alt: "Temporary placeholder for a bridal details photograph", ratio: "2 / 3" },
    { src: "assets/img/g6.svg", cat: "Bridal", alt: "Temporary placeholder for a second bridal photograph", ratio: "1 / 1" },
    { src: "assets/img/g7.svg", cat: "Soft Glam", alt: "Temporary placeholder for a second soft glam photograph", ratio: "4 / 5" },
    { src: "assets/img/g8.svg", cat: "Hair", alt: "Temporary placeholder for a second hair styling photograph", ratio: "4 / 3" }
  ],
  galleryCategoryOrder: ["Bridal", "Soft Glam", "Hair", "Special Occasions", "Bridal Details"]
};
