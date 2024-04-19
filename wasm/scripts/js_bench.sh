#!/usr/bin/env bash

# Устанавливаем количество итераций
n=10
total_time=0

for ((i=1; i<=n; i++))
do
    # Запускаем команду и сохраняем время выполнения
    start_time=$(date +%s%3N)
    bun $PWD/scripts/js_bench.js
    end_time=$(date +%s%3N)
    
    # Вычисляем время выполнения команды и добавляем его к общему времени
    execution_time=$((end_time - start_time))
    total_time=$((total_time + execution_time))
    
    echo "Итерация $i: Время выполнения - $execution_time миллисекунд"
done

# Считаем среднее время выполнения
average_time=$(echo "scale=3; $total_time / $n" | bc)

echo "Среднее время выполнения команды: $average_time миллисекунд"
