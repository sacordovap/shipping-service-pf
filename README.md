# Shipping Service -  Sistema de envíos
Sistema profesional para la gestión de envíos, administración de usuarios, diseñado con un enfoque **Mobile-First** y una arquitectura escalable.

## Tecnologías Principales
* **Frontend:** React, React Router Dom, Tailwind CSS, Lucide Icons.
* **Gestión de Estado:** Zustand, React Hooks (useState, useMemo, useContext).
* **Arquitectura:** Enfoque basado en *Features*.

## Características
- **Seguridad Dinámica:** Control de acceso basado en roles (Admin/Operador/Cliente).
- **Dashboard Dispatcher:** Redireccionamiento inteligente según el rol del usuario tras el inicio de sesión.
- **Interfaz Adaptable:** Experiencia fluida tanto en dispositivos móviles como en pantallas de escritorio.
- **Rastreo Público:** Sistema de seguimiento de paquetes.

## Arquitectura del Proyecto
El proyecto está organizado para ser escalable y fácil de mantener:

```text
src/
├── common/           # Componentes UI reutilizables (Buttons, Inputs, Cards)
├── features/         # Módulos de negocio (Shipping, Auth, Customer)
├── hooks/           # Hooks globales (Permisos, Auth)
├── pages/           # Vistas principales (Landing, Auth, Tracking, Customer, Shipping)
└── router/          # Definición de rutas protegidas y públicas
```

## Configuración del Entorno

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sacordovap/shipping-service-pf
   ```
2. Instalar dependencias:
   ```bash
   yarn install
   ```
3. Variables de entorno:
   Crea un archivo .env en la raíz basado en .env.copy:
   ```env
   URL_BACKEND = "http://localhost:8080/api/v1"
   ```
4. Ejecutar el proyecto:
   ```bash
   yarn dev
   ```

## Lógica de Permisos
El sistema protege las rutas críticas utilizando un componente ProtectedRoute y filtra el contenido basado en roles:
* **ADMIN:** Acceso total, gestión de usuarios, gestión de cliente y gestión de envíos.
* **OPERATOR:** Gestión operativa, seguimiento, gestión de envíos y gestión de clientes.
* **CLIENTE:** Acceso restringido únicamente a su panel de seguimiento.

## Decisiones Técnicas
* **Optimización de Renderizado:** Uso de useMemo para filtrado de datos pesado, evitando re-cálculos innecesarios.
* **Paso de Seguridad:** Implementación de validaciones lógicas para evitar acciones destructivas accidentales.
* **Desacoplamiento:** Separación de la lógica de negocio (hooks) de la representación visual (componentes)."