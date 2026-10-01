const normalizePhoneNumber = (phone) => {
  return String(phone).replace(/\D/g, "");
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
};

const destinationLabels = {
  assam: "Assam",
  meghalaya: "Meghalaya",
  "arunachal-pradesh": "Arunachal Pradesh",
};

const tripTypeLabels = {
  leisure: "Leisure",
  adventure: "Adventure",
  wildlife: "Wildlife",
  cultural: "Cultural",
};

const sendTemplateMessage = async ({ to, templateName, parameters }) => {
  const response = await fetch(
    `https://graph.facebook.com/${process.env.META_GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: normalizePhoneNumber(to),
        type: "template",
        template: {
          name: templateName,
          language: {
            code: process.env.WHATSAPP_TEMPLATE_LANGUAGE,
          },
          components: [
            {
              type: "body",
              parameters: parameters.map((value) => ({
                type: "text",
                text: String(value),
              })),
            },
          ],
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Unable to send WhatsApp message.");
  }

  return {
    messageId: data.messages?.[0]?.id || null,
  };
};

export const sendCustomerAcknowledgement = async (enquiry) => {
  const destination =
    destinationLabels[enquiry.destination] || enquiry.destination;

  return sendTemplateMessage({
    to: enquiry.phone,
    templateName: process.env.WHATSAPP_CUSTOMER_TEMPLATE,
    parameters: [
      enquiry.name,
      destination,
      formatDate(enquiry.startDate),
      formatDate(enquiry.endDate),
      process.env.BUSINESS_PHONE,
      process.env.BUSINESS_EMAIL,
    ],
  });
};

export const sendClientEnquiryNotification = async (enquiry) => {
  const destination =
    destinationLabels[enquiry.destination] || enquiry.destination;

  const tripType = tripTypeLabels[enquiry.tripType] || enquiry.tripType;

  return sendTemplateMessage({
    to: process.env.WHATSAPP_CLIENT_NUMBER,
    templateName: process.env.WHATSAPP_CLIENT_TEMPLATE,
    parameters: [
      enquiry.name,
      `${enquiry.phone} | ${enquiry.email}`,
      `${tripType} trip to ${destination}`,
      `${formatDate(enquiry.startDate)} to ${formatDate(enquiry.endDate)}`,
      enquiry.travellers,
      enquiry.message?.trim() || "No additional message provided.",
    ],
  });
};
