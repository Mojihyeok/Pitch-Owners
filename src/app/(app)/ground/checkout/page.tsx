import { CheckoutView } from "@/components/ground/CheckoutView";

// 1-3. 결제 · NFC 발주. (Next 16: searchParams 는 Promise)
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ grid?: string }>;
}) {
  const { grid } = await searchParams;
  return <CheckoutView gridId={grid} />;
}
