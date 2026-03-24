# DIMES Meetings System

Sistema web institucional para la gestión centralizada de reuniones, actas/minutas, asistencia, compromisos y usuarios de la Dirección de Monitoreo Estratégico de Servicios en Salud (DIMES).

---

## 1. Propósito del proyecto

Este sistema tiene como objetivo digitalizar y centralizar el registro formal de reuniones de DIMES, permitiendo:

- Crear y gestionar reuniones institucionales.
- Registrar asistencia de participantes.
- Elaborar actas o minutas estructuradas.
- Gestionar compromisos derivados de cada reunión.
- Organizar toda la información por establecimiento destacado.
- Facilitar acceso, trazabilidad, consulta, auditoría y orden institucional.

El sistema debe ser multiusuario, con control de acceso por roles y visibilidad restringida según ámbito organizacional.

---

## 2. Contexto funcional

Cada usuario DIMES pertenece a un **establecimiento destacado**.  
Las reuniones, minutas y compromisos deben quedar **centralizados y ordenados por establecimiento**, sin perder una visión institucional global para administradores autorizados.

El sistema debe servir como repositorio formal y consultable de reuniones institucionales, evitando dispersión en documentos sueltos, chats o archivos locales.

---

## 3. Objetivos funcionales

El sistema debe cubrir como mínimo los siguientes módulos:

1. **Autenticación y gestión de acceso**
2. **Gestión de usuarios**
3. **Gestión de roles y permisos**
4. **Catálogo de establecimientos**
5. **Gestión de reuniones**
6. **Gestión de actas/minutas**
7. **Registro de participantes**
8. **Control de asistencia**
9. **Gestión de compromisos**
10. **Panel de indicadores**
11. **Auditoría de acciones**
12. **Gestión de archivos adjuntos**

---

## 4. Alcance inicial (MVP)

La primera versión funcional debe permitir:

- Registro e inicio de sesión de usuarios.
- Asociación obligatoria del usuario a un establecimiento destacado.
- Creación de reuniones.
- Registro de participantes.
- Control de asistencia.
- Elaboración de minutas estructuradas.
- Registro de compromisos y responsables.
- Consulta y filtrado por establecimiento, fecha y estado.
- Dashboard básico.
- Administración de usuarios y establecimientos.
- Auditoría básica de acciones clave.

---

## 5. Reglas de negocio principales

### 5.1 Usuarios
- Todo usuario pertenece a un establecimiento destacado.
- Todo usuario tiene un rol.
- Un usuario activo puede autenticarse.
- Un usuario inactivo no debe poder ingresar.

### 5.2 Establecimientos
- Los establecimientos son un catálogo administrable.
- La organización principal de las reuniones y minutas se basa en el establecimiento.

### 5.3 Reuniones
- Una reunión puede ser programada, realizada o cancelada.
- Toda reunión debe tener un establecimiento relacionado.
- Toda reunión debe tener creador y fecha de creación.
- Una reunión puede tener participantes internos y externos.

### 5.4 Minutas
- Una minuta pertenece a una reunión.
- Una minuta puede estar en borrador o finalizada.
- Una minuta debe contener suficiente información institucional:
  - objetivo
  - agenda
  - desarrollo
  - acuerdos
  - observaciones

### 5.5 Asistencia
- La asistencia debe registrarse por participante y reunión.
- Estados mínimos:
  - asistió
  - no asistió
  - excusa

### 5.6 Compromisos
- Un compromiso nace de una minuta.
- Debe registrar:
  - descripción
  - responsable
  - fecha límite
  - estado
- Estados mínimos:
  - pendiente
  - en proceso
  - cumplido
  - vencido

### 5.7 Seguridad y visibilidad
- Los usuarios normales solo deben ver información de su ámbito autorizado.
- Administradores globales sí pueden ver toda la información.
- Todas las acciones relevantes deben quedar auditadas.

---

## 6. Roles mínimos del sistema

### Superadmin
Permisos globales sobre todo el sistema:
- administrar usuarios
- administrar establecimientos
- administrar roles
- ver todas las reuniones, minutas y compromisos
- ver auditoría

### Administrador DIMES
Permisos administrativos operativos:
- gestionar reuniones y minutas
- gestionar usuarios según ámbito definido
- consultar dashboard
- administrar asistencia y compromisos

### Usuario DIMES
Permisos funcionales limitados:
- crear reuniones
- registrar asistencia
- redactar minutas
- consultar información permitida
- actualizar su propio perfil

> La implementación debe quedar preparada para autorización granular y crecimiento futuro.

---

## 7. Estructura del repositorio

Este proyecto debe respetar estrictamente la siguiente estructura monorepo:

```text
dimes-meetings-system/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── shared/
│   ├── ui/
│   └── eslint-config/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   ├── seed.ts
│   └── seeds/
├── docs/
├── infra/
├── .github/
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
