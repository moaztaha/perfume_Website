"use client";


export function useProductSearch(search = "") {
  return {
    search,
    setSearch: (value: string) => {
      void value;
    },
  };
}
