@props(['label', 'icon', 'color', 'value', 'change'])

<article class="metric p-4 transition-[border-color,box-shadow] duration-200 hover:border-[#d6c5fa] hover:shadow-[0_10px_26px_#4c278314] max-[1100px]:p-3 motion-reduce:transition-none panel rounded-2xl border border-line bg-white shadow-[0_5px_16px_#28184008]">
    <div class="metric-head mb-[15px] flex items-center justify-between gap-[3px] max-[650px]:mb-2.5"><span class="metric-icon {{ $color }}"><i data-lucide="{{ $icon }}"></i></span><span class="change">{{ $change }}</span></div>
    <p>{{ $label }}</p><strong class="metric-value mt-[3px] block text-[clamp(1.25rem,2.3vw,2.1rem)] font-extrabold tracking-[-.065em] whitespace-nowrap">{{ $value }}</strong>
</article>
