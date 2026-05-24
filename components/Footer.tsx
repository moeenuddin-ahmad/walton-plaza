export const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 py-12 px-8 text-sm text-zinc-400 flex flex-col gap-4 sm:flex-row sm:justify-between items-center bg-white">
      <div>© 2024 Walton Plaza. All rights reserved.</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-zinc-600 transition-colors">
          Privacy
        </a>
        <a href="#" className="hover:text-zinc-600 transition-colors">
          Terms
        </a>
      </div>
    </footer>
  );
};
