import { useGLTF } from '@react-three/drei';
import { useRef, Suspense, Component } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ErrorBoundary simple para manejar errores de carga
class ModelErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Actualizar el estado para que el siguiente render muestre la UI de fallback
        console.warn('Error loading Target model from Supabase:', error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes registrar el error en un servicio de reporte de errores aquí
        console.warn('Target model error details:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Puedes renderizar cualquier UI de fallback personalizada
            return null; // No renderizar nada si hay error
        }

        return this.props.children;
    }
}

// Componente interno que carga el modelo
const TargetModel = (props) => {
    const targetRef = useRef()
    const { scene } = useGLTF(
        'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf'
    )

    useGSAP(() => {
        if (targetRef.current) {
            gsap.to(targetRef.current.position, {
                y: targetRef.current.position.y + 0.5,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
            })
        }
    })

    return (
        <mesh 
            {...props} 
            ref={targetRef} 
            rotation={[0, Math.PI / 5, 0]} 
            scale={1.5}
        >
            <primitive object={scene} />
        </mesh>
    );
};

// Componente wrapper con ErrorBoundary y Suspense para manejar errores de carga
const Target = (props) => {
    return (
        <ModelErrorBoundary>
            <Suspense fallback={null}>
                <TargetModel {...props} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

export default Target