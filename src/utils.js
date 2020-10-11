import fiveMoreSong from './songs/fiveMore.json'
import rickRollSong from './songs/rickroll.json'
import hallelujahSong from './songs/hallelujah.json'

const songBank = [fiveMoreSong, rickRollSong, hallelujahSong]

const findLargest = (arr) => {
  let largest = 0
  for (const num of arr) {
    largest = num > largest ? num : largest
  }
  return largest
}

const normalizeAudioSample = (audioRec, audioRecMax, normalLevel) => {
  // const max = audioSample.reduce((mem, value) => mem < value ? value : mem)
  // console.log(normalLevel)
  const multiplier = normalLevel / audioRecMax
  return audioRec.map(sample => sample * multiplier)
}

const compareSongs = (refSong, audioRec) => {
  const audioRecMax = findLargest(audioRec)
  // Loop every five to start compare
  let smallestDiff = null
  for (let index = 0; index < refSong.length - audioRec.length; index = index + 5) {
    // Normalize
    // audioRec = normalizeAudioSample(audioRec, audioRecMax, findLargest(refSong.slice(index, index + audioRec.length))) // Too bad

    // Compare songs to each other
    let diff = 0
    for (let sampleIndex = 0; sampleIndex < audioRec.length; sampleIndex++) {
      // diff = diff + audioRec[sampleIndex] - refSong[index + sampleIndex]
      // if (sampleIndex % 2) {
      //   // Is index identifier!
      //   diff = (refSong[index + sampleIndex] - sampleIndex) * 10 // Give penalty for being of key!
      // } else {
      if (refSong[index + sampleIndex] > audioRec[sampleIndex]) {
        diff = diff + refSong[index + sampleIndex] - audioRec[sampleIndex]
      } else {
        diff = diff + audioRec[sampleIndex] - refSong[index + sampleIndex]
      }
      // }

      // diff = diff + Math.abs(refSong[index + sampleIndex] - audioRec[sampleIndex]) // This way is too processor intensive!
    }
    if (smallestDiff === null) { // Ugly code, but works for this case, terribleness
      smallestDiff = diff
    }
    if (diff < smallestDiff) {
      smallestDiff = diff
    }
    // console.log('The diff is: ' + diff) // This log is bad, too bad!
  }
  // return smallestDiff / audioRec.length
  console.log(smallestDiff)
  return Math.abs(smallestDiff)
}

function findSong (sample) {
  // console.log('checking')
  // console.log(sample)

  let bestMatch = {}
  // const songs = []
  songBank.forEach(song => {
    const match = compareSongs(song.audio, sample)
    // if (match < 0.05) {
    // console.log('Sounds like ' + song.name)
    const obj = {
      threshold: match,
      name: song.name,
      artist: song.artist,
      artwork: song.artwork
    }
    if (!bestMatch.threshold) {
      bestMatch = obj
    } else {
      if (bestMatch.threshold > match) {
        bestMatch = obj
      }
    }
    // }
    // console.log(match)
    // songs.push(obj)
    // console.log(song)
  })
  // console.log('Sounds like ' + bestMatch.name)
  // console.log(songs)
  return bestMatch
}

export {
  compareSongs,
  findSong
}
