<section id="proyectos" aria-labelledby="projects-title">
    <div class="section-heading mb-[15px] flex items-end justify-between gap-4 max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-[9px]"><div><h2 id="projects-title">Proyectos recientes</h2><p>Consulta el estado de las entregas del equipo.</p></div>
    <label class="select-control"><i data-lucide="list-filter"></i><select id="project-filter" aria-label="Filtrar proyectos por estado"><option value="all">Todos los estados</option><option>En curso</option><option>En revisión</option><option>Entregado</option></select><i data-lucide="chevron-down"></i></label></div>
    <div class="panel rounded-2xl border border-line bg-white shadow-[0_5px_16px_#28184008] table-wrap overflow-auto reveal">
        <table>
            <thead><tr><th scope="col">Proyecto</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col">Progreso</th></tr></thead>
            <tbody>
            @foreach ([
                ['A', 'Identidad visual', 'Altura Coffee', 'En curso', 72, 'purple'],
                ['B', 'Plataforma e-commerce', 'Brava Market', 'En revisión', 90, 'peach'],
                ['L', 'Campaña de lanzamiento', 'Lumen Energia', 'Entregado', 100, 'green'],
                ['O', 'Rediseño web', 'Órbita Labs', 'En curso', 45, 'blue'],
                ['N', 'Sistema de diseño', 'Nativa Living', 'En revisión', 85, 'purple'],
            ] as [$initial, $project, $client, $status, $progress, $color])
                <tr data-status="{{ $status }}">
                    <th scope="row"><span class="project-icon {{ $color }}">{{ $initial }}</span>{{ $project }}</th>
                    <td>{{ $client }}</td><td><span class="status {{ ['En curso' => 'blue', 'En revisión' => 'peach', 'Entregado' => 'green'][$status] }}">{{ $status }}</span></td>
                    <td><span class="progress flex items-center gap-2 tabular-nums"><span class="track" aria-hidden="true"><span style="--progress: {{ $progress }}%"></span></span>{{ $progress }}%</span></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</section>
