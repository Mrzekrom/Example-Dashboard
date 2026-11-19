<section class="overview" aria-labelledby="overview-title">
    <div class="section-heading mb-[15px] flex items-end justify-between gap-4 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-[9px]">
        <div><h2 id="overview-title">Resumen del negocio</h2><p>Indicadores del estudio para el periodo seleccionado.</p></div>
        <div class="actions flex flex-wrap gap-2">
            <label class="select-control"><i data-lucide="calendar-days"></i><select id="period" aria-label="Periodo del informe"><option value="90">Últimos 90 días</option><option value="30">Últimos 30 días</option><option value="7">Últimos 7 días</option></select><i data-lucide="chevron-down"></i></label>
            <button class="button" id="export" type="button"><i data-lucide="download"></i> Exportar CSV</button>
        </div>
    </div>
    <div class="metrics grid grid-cols-4 gap-3.5 max-[650px]:grid-cols-2 max-[650px]:gap-[9px]">
        @foreach ([
            ['Ingresos', 'wallet', 'purple', '84.250 €', '+12,8%'],
            ['Proyectos activos', 'layers', 'blue', '24', '+4'],
            ['Clientes atendidos', 'users', 'peach', '38', '+8,6%'],
            ['Tasa de conversión', 'target', 'green', '6,4 %', '+1,2 pp'],
        ] as [$label, $icon, $color, $value, $change])
            <x-dashboard.metric :label="$label" :icon="$icon" :color="$color" :value="$value" :change="$change" />
        @endforeach
    </div>
    <p id="notice" class="sr-only" role="status"></p>
</section>
