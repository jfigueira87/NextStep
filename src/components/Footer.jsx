import React from 'react';

const Footer = () => {
  return (
    <section className=" border-t">
      <div className="max-w-screen-xl px-4 py-4 mx-auto space-y-4 text-center">
        <nav className="flex flex-wrap justify-center space-x-6">
          <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
            Términos de uso
          </a>
          <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
            Política de privacidad
          </a>
          <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
            Mapa del sitio
          </a>
          <a href="#" className="text-base leading-6 text-gray-500 hover:text-gray-900">
            Contacto
          </a>
        </nav>
        <div className="flex justify-center space-x-6 mt-4">          
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.047 1.024.06 1.378.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.047-1.378.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427C2.013 14.099 2 13.744 2 11.314c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.71 2.565c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.885 2 12.315 2zm-.315 5.5c-3.055 0-5.5 2.445-5.5 5.5s2.445 5.5 5.5 5.5 5.5-2.445 5.5-5.5-2.445-5.5-5.5-5.5zm0 9c-1.95 0-3.5-1.55-3.5-3.5S10.05 8 12.315 8s3.5 1.55 3.5 3.5-1.55 3.5-3.5 3.5zM17 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd"></path>
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M23.954 4.57a10.17 10.17 0 01-2.825.775 4.931 4.931 0 002.163-2.724 9.88 9.88 0 01-3.127 1.19A4.93 4.93 0 0016.73 3c-2.724 0-4.938 2.218-4.938 4.94 0 .387.043.765.126 1.127-4.11-.205-7.743-2.171-10.178-5.144-.426.726-.669 1.571-.669 2.477 0 1.71.87 3.213 2.189 4.088a4.92 4.92 0 01-2.23-.616v.062c0 2.387 1.688 4.373 3.93 4.83a4.946 4.946 0 01-2.224.085c.629 1.953 2.445 3.376 4.586 3.417a9.868 9.868 0 01-6.102 2.104c-.396 0-.785-.023-1.171-.067a13.892 13.892 0 007.548 2.211c9.058 0 14.001-7.497 14.001-13.986 0-.21-.004-.42-.013-.628A9.93 9.93 0 0024 4.59a9.901 9.901 0 01-2.846.775 4.942 4.942 0 002.163-2.724z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} NextStep. Todos los derechos reservados.
        </p>
      </div>
    </section>
  );
};

export default Footer;


