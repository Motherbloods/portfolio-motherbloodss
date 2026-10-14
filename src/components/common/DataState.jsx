export function DataLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[#4B5320]">
      <div className="w-10 h-10 border-4 border-[#67AE6E]/30 border-t-[#67AE6E] rounded-full animate-spin"></div>
    </div>
  );
}

export function DataError({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-[#4B5320]">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md border border-[#67AE6E]/20">
        <h3 className="text-xl font-bold mb-2">Gagal memuat data</h3>
        <p className="text-[#4B5320]/80">{message}</p>
      </div>
    </div>
  );
}
