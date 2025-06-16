export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 border-t border-amber-200 py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-4">
        <span className="text-amber-700 font-semibold">© {new Date().getFullYear()} Meditación Sonora</span>
        <div className="flex gap-6 text-2xl">
          <a href="https://www.instagram.com/aguamusicaparaser/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-pink-600 hover:text-pink-800 transition-colors">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.13.62a1.13 1.13 0 1 1-2.26 0 1.13 1.13 0 0 1 2.26 0z"/></svg>
          </a>
        
          <a href="https://wa.me/541141636472" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-green-600 hover:text-green-800 transition-colors">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.372.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374A9.86 9.86 0 0 1 2.13 12.01c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.987c-.003 5.45-4.437 9.884-9.888 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.018.003C5.406.003.003 5.406.003 12.01c0 2.123.555 4.197 1.607 6.022L.057 23.925a1.001 1.001 0 0 0 1.225 1.225l5.892-1.553a11.93 11.93 0 0 0 4.844 1.034h.005c6.611 0 12.014-5.403 12.017-12.012a11.95 11.95 0 0 0-3.504-8.49z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-red-600 hover:text-red-800 transition-colors">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 7.2a2.8 2.8 0 0 0-2-2C17.2 5 12 5 12 5s-5.2 0-7.8.2a2.8 2.8 0 0 0-2 2C2 9.8 2 12 2 12s0 2.2.2 4.8a2.8 2.8 0 0 0 2 2C6.8 19 12 19 12 19s5.2 0 7.8-.2a2.8 2.8 0 0 0 2-2c.2-2.6.2-4.8.2-4.8s0-2.2-.2-4.8zM10 15.5v-7l6 3.5-6 3.5z"/></svg>
          </a>
          <a href="https://linktr.ee/aguamusicaparaser" target="_blank" rel="noopener noreferrer" aria-label="Linktree" className="text-amber-700 hover:text-amber-900 transition-colors">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.707-7.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.414L13 15.414V8a1 1 0 1 0-2 0v7.414l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
