import MessagingPage from "./messaging-page";

export function generateStaticParams() {
  // Generate the static params for your messaging pages
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    // Add more IDs as needed
  ];
}

export default function Page({ params }: { params: { id: string } }) {
  return <MessagingPage params={params} />;
}
