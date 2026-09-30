/** THE OPUS NETWORK — centralized, editable public content. */
const OPUS_DATA = {
  company: {
    name: "THE OPUS NETWORK", tagline: "Electric mobility for everyday work.",
    description: "Electric vehicle rentals for riders and businesses across Bengaluru.",
    operatingCity: "Bengaluru", branchArea: "HSR",
    serviceAreas: ["HSR", "Banashankari", "Electronic City", "Varthur", "and surrounding Bengaluru areas"],
    upcomingCity: "Hyderabad", upcomingStatus: "Launching soon",
    phone: "9606981553", email: "theopusnetwork@gmail.com", enquiryUrl: "https://forms.gle/9we6HGHLLd8kzLKq5",
    reportingDate: ""
  },
  metrics: { totalFleet: 600, activeRiders: 423, operatingCities: 1, modelsListed: 5 },
  vehicles: [
    { id: "sheema-eagle", name: "Sheema Eagle", speedCategory: "Electric scooter", topSpeed: "40 km/h", range: "60 km average", batteryProvider: "Indofast", availabilityStatus: "Bengaluru — enquire for current availability", description: "A rental EV option for riders and everyday work in Bengaluru.", primaryImage: "images/sheema_eagle_low_speed_cutout.png", gallery: ["images/sheema_eagle_low_speed_cutout.png"], specs: { "Stated speed": "40 km/h", "Average range": "60 km", "Battery ecosystem": "Indofast" }, enquiryEnabled: true },
    { id: "sheema-eagle-plus", name: "Sheema Eagle Plus", speedCategory: "High-speed EV", topSpeed: "50+ km/h", range: "60 km average", batteryProvider: "Indofast", availabilityStatus: "Bengaluru — enquire for current availability", description: "A high-speed rental EV option for riders and everyday work in Bengaluru.", primaryImage: "images/sheema_eagle_plus_high_speed_cutout.png", gallery: ["images/sheema_eagle_plus_high_speed_cutout.png", "images/sheema_eagle_plus_high_speed_alt_cutout.png"], specs: { "Stated speed": "50+ km/h", "Average range": "60 km", "Battery ecosystem": "Indofast" }, enquiryEnabled: true },
    { id: "ectyzipp", name: "Ectyzipp", speedCategory: "Electric scooter", topSpeed: "50+ km/h", range: "90 km average", batteryProvider: "Mooving", availabilityStatus: "Bengaluru — enquire for current availability", description: "An electric rental option for riders and everyday work in Bengaluru.", primaryImage: "images/ectyzipp_cutout.png", gallery: ["images/ectyzipp_cutout.png"], specs: { "Stated speed": "50+ km/h", "Average range": "90 km", "Battery ecosystem": "Mooving" }, enquiryEnabled: true },
    { id: "lxs-2-0", name: "LXS 2.0", speedCategory: "Electric scooter", topSpeed: "50+ km/h", range: "90 km average", batteryProvider: "Mooving", availabilityStatus: "Bengaluru — enquire for current availability", description: "An electric rental option for riders and everyday work in Bengaluru.", primaryImage: "images/lectrix2.0_cutout.png", gallery: ["images/lectrix2.0_cutout.png"], specs: { "Stated speed": "50+ km/h", "Average range": "90 km", "Battery ecosystem": "Mooving" }, enquiryEnabled: true },
    { id: "op-bike", name: "OP Bike", speedCategory: "Electric bike", topSpeed: "50+ km/h", range: "90 km average", batteryProvider: "Battery Smart and Mooving", availabilityStatus: "Bengaluru — enquire for current availability", description: "An OPUS electric rental option for riders and everyday work in Bengaluru.", primaryImage: "images/op_bike.png", gallery: ["images/op_bike.png"], specs: { "Stated speed": "50+ km/h", "Average range": "90 km", "Battery ecosystem": "Battery Smart and Mooving" }, enquiryEnabled: true }
  ],
  batteryProviders: [
    { id: "indofast", name: "Indofast", relationship: "Battery ecosystem connection", description: "Used with Sheema Eagle and Sheema Eagle Plus in the OPUS fleet.", compatibleModels: ["Sheema Eagle", "Sheema Eagle Plus"], locations: "", officialWebsite: "", status: "In use" },
    { id: "mooving", name: "Mooving", relationship: "Battery ecosystem connection", description: "Used with Ectyzipp, LXS 2.0 and OP Bike in the OPUS fleet.", compatibleModels: ["Ectyzipp", "LXS 2.0", "OP Bike"], locations: "", officialWebsite: "", status: "In use" },
    { id: "battery-smart", name: "Battery Smart", relationship: "Battery ecosystem connection", description: "Used with OP Bike in the OPUS fleet.", compatibleModels: ["OP Bike"], locations: "", officialWebsite: "", status: "In use" }
  ],
  services: [
    { id: "ev-rentals", title: "EV Rentals", badge: "For Riders", desc: "Electric vehicles available on a rental basis. Enquire for current model availability and rental details.", actionText: "Enquire about a rental" },
    { id: "rider-mobility", title: "Rider Mobility", badge: "Everyday Work", desc: "Electric mobility options for riders working across Bengaluru.", actionText: "Talk to OPUS" },
    { id: "fleet-business", title: "Fleet Solutions", badge: "For Business", desc: "EV access for businesses with fleet and urban mobility requirements.", actionText: "Discuss your requirement" },
    { id: "battery-ecosystem", title: "Battery Ecosystem Access", badge: "Where Available", desc: "Battery swapping connections are available by model and operating area.", actionText: "Explore connections" },
    { id: "service-areas", title: "Bengaluru Service Areas", badge: "Local Coverage", desc: "A branch in HSR, with servicing in Banashankari, Electronic City, Varthur and other Bengaluru areas.", actionText: "View operating areas" },
    { id: "business-mobility", title: "Business Mobility", badge: "For Organisations", desc: "Discuss electric mobility and vehicle access for your organisation.", actionText: "Talk to our team" }
  ],
  workflow: [
    { step: "01", title: "Choose a vehicle", desc: "Browse the five OPUS vehicle models." },
    { step: "02", title: "Send an enquiry", desc: "Use the OPUS enquiry form to share what you need." },
    { step: "03", title: "Confirm the details", desc: "The OPUS team can discuss availability and rental terms with you." },
    { step: "04", title: "Get moving", desc: "Proceed once the vehicle and rental details are confirmed." }
  ],
  faqs: [
    { question: "What is THE OPUS NETWORK?", answer: "THE OPUS NETWORK provides electric vehicles on a rental basis for riders and businesses." },
    { question: "Which vehicles are in the fleet?", answer: "Sheema Eagle, Sheema Eagle Plus, Ectyzipp, LXS 2.0 and OP Bike." },
    { question: "Where does OPUS operate?", answer: "OPUS operates across Bengaluru, with a branch in HSR and servicing in Banashankari, Electronic City, Varthur and other Bengaluru areas." },
    { question: "Is OPUS coming to Hyderabad?", answer: "Hyderabad is launching soon." },
    { question: "Which battery ecosystem connections are used?", answer: "Indofast, Mooving and Battery Smart. The connection depends on the vehicle model." },
    { question: "How do I enquire about a rental?", answer: "Use the enquiry form linked on this website to contact THE OPUS NETWORK." },
    { question: "What are the rental terms and required documents?", answer: "Please enquire with the OPUS team for current requirements and terms." },
    { question: "Can a business enquire about fleet access?", answer: "Yes. Businesses can submit a requirement through the OPUS enquiry form." }
  ],
  contact: {
    phone: "9606981553", phoneDisplay: "", whatsapp: "", email: "theopusnetwork@gmail.com",
    enquiryUrl: "https://forms.gle/9we6HGHLLd8kzLKq5",
    expansionCity: "Hyderabad — Launching soon", workingHours: "", sunday: ""
  },
  legal: {
    privacy: "Privacy information for this website should be completed and reviewed against the live enquiry form and the company’s actual data-handling practices before publication.",
    terms: "Vehicle availability, rental pricing, deposits, eligibility, documents, and service terms should be confirmed directly with THE OPUS NETWORK before a rental is agreed. The rental agreement will govern the final terms."
  }
};
