import fiveMoreSong from './songs/fiveMore.json'
import rickRollSong from './songs/rickroll.json'
import hallelujahSong from './songs/hallelujah.json'

const songBank = [fiveMoreSong, rickRollSong, hallelujahSong]

const compareSongs = (refSong, audioRec) => {
  // Loop every five to start compare
  let smallestDiff = null
  for (let index = 0; index < refSong.length - audioRec.length; index = index + 5) {
    // Compare songs to each other
    let diff = 0
    for (let sampleIndex = 0; sampleIndex < audioRec.length; sampleIndex++) {
      diff = diff + Math.abs(refSong[index + sampleIndex] - audioRec[sampleIndex])
    }
    if (smallestDiff === null) { // Ugly code, but works for this case, terribleness
      smallestDiff = diff
    }
    if (diff < smallestDiff) {
      smallestDiff = diff
    }
    // console.log('The diff is: ' + diff) // This log is bad, too bad!
  }
  return smallestDiff / audioRec.length
}

const extract = (spectrum) => {
  const values = [0, 0, 0, 0, 0]

  for (let i = 0; i < spectrum.length; i++) {
    if (i <= 134) {
      if (spectrum[i] > values[0]) {
        values[0] = spectrum[i]
      }
    } else if (i <= 270) {
      if (spectrum[i] > values[1]) {
        values[1] = spectrum[i]
      }
    } else if (i <= 406) {
      if (spectrum[i] > values[2]) {
        values[2] = spectrum[i]
      }
    } else if (i <= 612) {
      if (spectrum[i] > values[3]) {
        values[3] = spectrum[i]
      }
    } else {
      if (spectrum[i] > values[4]) {
        values[4] = spectrum[i]
      }
    }
    // this is dumb, too bad!
  }

  return values
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
      artist: song.artist
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
  extract,
  findSong
}
