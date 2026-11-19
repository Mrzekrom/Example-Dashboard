<section id="rendimiento" class="performance" aria-labelledby="performance-title">
    <div class="section-heading mb-[15px] flex items-end justify-between gap-4 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-[9px]"><div><h2 id="performance-title">Rendimiento</h2><p>Evolución de ingresos y distribución por servicio.</p></div></div>
    <div class="charts grid grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-3.5 max-[650px]:grid-cols-1">
        <article class="panel rounded-2xl border border-line bg-white shadow-[0_5px_16px_#28184008] chart-card min-w-0 p-5 max-[650px]:p-3.5 reveal">
            <div class="chart-heading"><div><h3>Evolución de ingresos</h3><p>Comparación con el periodo anterior</p></div></div>
            <div class="chart-frame relative mt-[18px] h-[238px]"><canvas id="revenue-chart" role="img" aria-label="Evolución de ingresos comparada con el periodo anterior"></canvas></div>
            <div class="chart-legend"><span><b></b>Periodo actual</span><span><b></b>Periodo anterior</span></div>
        </article>
        <article class="panel rounded-2xl border border-line bg-white shadow-[0_5px_16px_#28184008] chart-card min-w-0 p-5 max-[650px]:p-3.5 reveal">
            <div class="chart-heading"><div><h3>Ingresos por servicio</h3><p>Participación en el total del periodo</p></div></div>
            <div class="donut-wrap relative mx-auto my-2.5 h-[178px] w-[min(100%,178px)]"><canvas id="services-chart" role="img" aria-label="Distribución de ingresos por servicio"></canvas><div class="donut-center pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><strong id="service-total">84.250 €</strong><small>Ingresos totales</small></div></div>
            <ul class="service-legend m-0 grid list-none gap-[7px] p-0 text-[.85rem] text-[#51475f]" id="service-legend"></ul>
        </article>
    </div>
</section>
