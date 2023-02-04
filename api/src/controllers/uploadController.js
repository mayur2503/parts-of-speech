const uploadFile = require("../middleware/upload");
const fs = require("fs/promises");
const WordPOS = require("wordpos");
const asyncPool = require("tiny-async-pool");
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // reding file
    let fileData = await fs.readFile(
      `${__basedir}/uploads/${req.file.originalname}`,
      { encoding: "utf8" }
    );

    // array of sentence
    let sentenceArray = fileData.split("\n");

    // diving sentenceArray in chunks of size 2000 sentence per chunks
    const perChunk = 1000;
    const sentenceArrayInParts = sentenceArray.reduce(
      (resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk);
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []; // start a new chunk
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
      },
      []
    );

    //counting total words
    let totalWords = 0;
    for (let index = 0; index < sentenceArray.length; index++) {
      const worldLength = sentenceArray[index].split(" ").length;
      totalWords = totalWords + worldLength;
    }

    const partsOfSpeech = {
      nouns: 0,
      verbs: 0,
      adjectives: 0,
      adverbs: 0,
      totalWords: totalWords,
    };

    // executing promises with concurency of 90000
    const data = await asyncPoolAll(100, sentenceArrayInParts, getPos);
    for (let index = 0; index < data.length; index++) {
      const sentenceData = data[index];
      partsOfSpeech.nouns = partsOfSpeech.nouns + sentenceData.nouns.length;
      partsOfSpeech.verbs = partsOfSpeech.verbs + sentenceData.verbs.length;
      partsOfSpeech.adjectives =
        partsOfSpeech.adjectives + sentenceData.adjectives.length;
      partsOfSpeech.adverbs =
        partsOfSpeech.adverbs + sentenceData.adverbs.length;
    }
    res.status(200).send({
       ...partsOfSpeech
    });
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

async function getPos(sentence) {
  const result = await new WordPOS().getPOS(sentence.join(" "));
  return result;
}

async function asyncPoolAll(...args) {
  const results = [];
  for await (const result of asyncPool(...args)) {
    results.push(result);
  }
  return results;
}

module.exports = {
  upload,
};
