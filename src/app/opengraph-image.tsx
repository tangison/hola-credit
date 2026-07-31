import { Metadata } from "next";

export default function OpengraphImage() {
  // This is a route handler that would normally generate an OG image
  // For now, we redirect to the social image
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/social/hola-credit-social-en.svg",
    },
  });
}
