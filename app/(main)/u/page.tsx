"use server";

import { RedirectType } from "next/navigation";
import { permanentRedirect } from "next/navigation";
export default async function page() {
    return permanentRedirect("/u/orders", RedirectType.replace);
}
