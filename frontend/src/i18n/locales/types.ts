/** Explicit locale type with all string values so both en and zh satisfy it (no literal types from en). */
export interface LocaleStrings {
  siteName: string
  nav: { home: string; admin: string }
  footer: { tagline: string }
  public: {
    title: string
    hashQueryTitle: string
    hashQueryDesc: string
    hashQueryPlaceholder: string
    query: string
    querying: string
    result: {
      courier: string
      trackingNo: string
      status: string
      noData: string
    }
  }
  product: {
    style: string
    verifyTitle: string
    verifyPlaceholder: string
    verify: string
    imagePlaceholder: string
    videoPlaceholder: string
  }
  admin: {
    title: string
    desc: string
    tableHash: string
    tableCourier: string
    tableTracking: string
    actions: string
    addRow: string
    save: string
    saved: string
    delete: string
    hashPlaceholder: string
    courierPlaceholder: string
    trackingPlaceholder: string
    note: string
  }
  lang: { en: string; zh: string }
}
