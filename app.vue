<script lang="ts">


</script>

<template>
	<div class="h-[600px] flex flex-col items-center">
		<h1 class="text-5xl text-center p-5">
			PKDX
		</h1>
		<div class="w-4/5 p-5 bg-red-300">
			<controlPanel>
				<imagePortal />
				<InfoDisplay />
				<StatsDisplay />
				<dataView />
				<movesList />
			</controlPanel>
		</div>
	</div>
</template>
