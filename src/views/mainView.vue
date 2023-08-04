<template>
    <div class="map">
        <ul v-for="(item, index) in map" :key="index" class="row">
            <li v-for="(ele, idx) in item" :key="idx" class="col">
                <span v-if="ele === -1" class="item food"></span>
                <span v-else-if="ele === 0" class="item"></span>
                <span v-else-if="ele === 1" class="item snake snake_head" :class="direction">
                </span>
                <span v-else class="item snake"></span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

import { reactive, ref, onMounted, toRaw } from 'vue'

const mapRow = 10;
const mapCol = 10;
let arr: number[][] = [[]]
for (let i = 0; i < mapRow; i++) {
    arr.push([])
    for (let j = 0; j < mapCol; j++) {
        arr[i].push(0)
    }
}
arr.pop()

// const map: number[][] = reactive([
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ])
const map: number[][] = reactive(arr)

function initMap(map: number[][]) {
    map.forEach(ele => {
        ele.fill(0)
    })
    createFood()
}

// 蛇头
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}
let direction = ref<Direction>(Direction.Up)

// let snake_head = ref<HTMLElement | null>(null)
function rotate(val: Direction) {
    direction.value = val
}



/* 蛇的位置 */
const row = ref(Math.floor(Math.random() * mapRow))
const col = ref(Math.floor(Math.random() * mapCol))
const snake = reactive([[row.value, col.value], [row.value + 1, col.value]])
snake.forEach((ele, index) => {
    map[ele[0]][ele[1]] = index + 1
})
/* 食物位置 */
let x = ref(Math.floor(Math.random() * 10))
let y = ref(Math.floor(Math.random() * 10))



function createFood() {
    snake.forEach((ele, index) => {

    })
    map[x.value][y.value] = -1
}
createFood()

/* 是否吃到食物 */
function EatFood() {
    let flag = false
    if (snake[0][0] == x.value && snake[0][1] == y.value) {
        x = ref(Math.floor(Math.random() * mapRow))
        y = ref(Math.floor(Math.random() * mapCol))
        flag = true
    }
    return flag
}
/* 是否触碰到自身 */
function isDead(row: number, col: number) {
    if (snake[0].includes(row) && snake[0].includes(col)) {
        console.log(snake);
        console.log(row, col);
        return true
    }
    return false
}


/* 移动蛇 */
function move() {
    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowUp':
                rotate(Direction.Up)
                row.value--
                if (row.value <= -1) {
                    row.value = mapRow - 1
                }
                snake.pop()
                snake.unshift([row.value, col.value])

                if (EatFood()) {
                    row.value -= 1
                    snake.unshift([row.value, col.value])
                }

                initMap(map)
                snake.forEach((ele, index) => {
                    map[ele[0]][ele[1]] = index + 1
                })

                break;
            case 'ArrowDown':
                rotate(Direction.Down)
                row.value += 1
                if (row.value >= mapRow) {
                    row.value = 0
                }
                snake.pop()
                snake.unshift([row.value, col.value])
                if (EatFood()) {
                    row.value += 1
                    snake.unshift([row.value, col.value])
                }
                initMap(map)
                snake.forEach((ele, index) => {
                    map[ele[0]][ele[1]] = index + 1
                })
                break;
            case 'ArrowLeft':
                rotate(Direction.Left)
                col.value -= 1
                if (col.value <= -1) {
                    col.value = mapCol - 1
                }
                snake.pop()
                snake.unshift([row.value, col.value])
                if (EatFood()) {
                    col.value -= 1
                    snake.unshift([row.value, col.value])
                }
                initMap(map)
                snake.forEach((ele, index) => {
                    map[ele[0]][ele[1]] = index + 1
                })
                break;
            case 'ArrowRight':
                rotate(Direction.Right)
                col.value += 1
                if (col.value >= mapCol) {
                    col.value = 0
                }
                snake.pop()
                snake.unshift([row.value, col.value])
                if (EatFood()) {
                    col.value += 1
                    snake.unshift([row.value, col.value])
                }
                initMap(map)
                snake.forEach((ele, index) => {
                    map[ele[0]][ele[1]] = index + 1
                })
                break;
            default:
                break;
        }
    })
}
onMounted(() => {
    move()
})

</script>

<style scoped lang="less">
* {
    user-select: none;
    box-sizing: border-box;
}

.map {
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;

    .row {
        flex: 1;
        display: flex;
        list-style: none;
  

        .col {
            flex: 1;
            border: 1px solid rgba(255, 255, 255, .1);

            display: flex;
            justify-content: center;
            align-items: center;

            .item {
                display: flex;
                width: 100%;
                height: 100%;
                justify-content: center;
                align-items: center;

                &.food {
                    width: 80%;
                    height: 80%;
                    background-color: #fff;
                    border-radius: 50%;
                }

                &.snake {
                    background-color: rgba(253, 89, 92, 1);
                }

                &.snake_head {
                    width: 100%;
                    height: 100%;
                    // background-color: transparent;
                    border-radius: 5% 5% 0 0;

                }

                &.UP {
                    transform: rotate(0deg) !important;
                }

                &.DOWN {
                    transform: rotate(180deg) !important;
                }

                &.LEFT {
                    transform: rotate(-90deg) !important;
                }

                &.RIGHT {
                    transform: rotate(90deg) !important;
                }
            }
        }
    }
}
</style>