<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f6f5fa">
    <title>Nexo Studio · Panel de operaciones</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <a class="skip" href="#resumen">Saltar al contenido</a>
    <div class="reading-progress fixed inset-x-0 top-0 z-15 h-[3px] origin-left pointer-events-none" aria-hidden="true"></div>
    @include('dashboard.sidebar')
    <main id="resumen">
        <header class="topbar flex h-[69px] items-center justify-between border-b border-line bg-white px-[34px] text-sm max-[1100px]:px-[23px] max-[850px]:h-[52px] max-[650px]:justify-end max-[650px]:px-[13px]">
            <div class="breadcrumb text-muted max-[650px]:hidden">Espacio de trabajo <span>/</span> <strong>Resumen</strong></div>
            <span class="demo"><span></span> Datos de demostración</span>
        </header>
        <div class="content mx-auto max-w-[1530px] px-[34px] pt-7 max-[1100px]:px-[23px] max-[650px]:px-[13px] max-[650px]:pt-3.5">
            @yield('content')

            <footer><strong>Nexo Studio</strong><span>Panel de demostración · Datos ficticios</span></footer>
        </div>
    </main>
</body>
</html>
