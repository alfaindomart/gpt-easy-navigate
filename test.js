const nums = [1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 13]

function test(input) {
  let counter = 1
  const lost = []
  for (let i = 0; i < nums.length; i++) {
    if (input[i] !== counter) {
      console.log('lost is ' + counter)
      lost.push(counter)
      counter += 2
    } 
    else counter++
  }
  console.log(lost)
}
  
test(nums)