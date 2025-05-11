import { useNavigate } from "react-router-dom";

export function Main_btn({ text, onClick }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        // Si se proporciona una función onClick personalizada, usarla
        if (onClick) {
            onClick();
            return;
        }
        
        // Navegación predeterminada: ir al homepage y al componente BookTour
        const isHomePage = window.location.pathname === '/';
        
        // Guardar el estado en localStorage para activar la animación después de la navegación
        localStorage.setItem('triggerBookTourAnimation', 'true');
        
        if (!isHomePage) {
            // Si no estamos en la página principal, navegamos a ella primero
            navigate('/');
            
            // No necesitamos hacer nada más aquí, ya que el efecto en BookTour.jsx
            // detectará el flag en localStorage y activará la animación
        } else {
            // Si ya estamos en la página principal, solo hacemos scroll y animación
            const bookTourElement = document.querySelector('.scroll-to-book-tour');
            if (bookTourElement) {
                bookTourElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Enviar evento personalizado para activar la animación
                window.dispatchEvent(new CustomEvent('highlightBookTour'));
            }
        }
    };
    
    return (
        <>
            <button
                onClick={handleClick}
                className="cursor-pointer flex justify-center items-center px-[20px] py-[10px] font-secondary text-[18px] font-semibold rounded-full bg-adrians-red shadow-adrians-btn-shadow text-white
                hover:shadow-adrians-btn-shadow-hover hover:scale-105
                transition-all duration-300 ease-in-out">
                {text}
            </button>
        </>
    );
}