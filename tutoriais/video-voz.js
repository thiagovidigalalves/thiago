/**
 * Voz dos vídeos (ElevenLabs). Padrão: a voz clonada do Thiago ("thiago vidigal"), pedido do dono: usar SEMPRE.
 * A chave fica como network secret do ambiente (host api.elevenlabs.io, header xi-api-key): o proxy coloca a
 * chave; aqui vai só um valor de preenchimento. Áudios ficam em cache (tutoriais/.cache-audio) pelo texto.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const VOZ = process.env.ELEVENLABS_VOZ || 'raWp8W6crHict9dwrvex'; // thiago vidigal (pt-BR, clonada)
const MODELO = process.env.ELEVENLABS_MODELO || 'eleven_multilingual_v2';
const CACHE = path.join(__dirname, '.cache-audio');
const VELOCIDADE = Number(process.env.ELEVENLABS_VELOCIDADE || 1.1); // fala um pouco mais rápida (pedido do dono)
const duracao = f => Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]).toString().trim()) || 0;

function falar(texto) {
  const estimada = Math.max(1.6, texto.length / 14);
  if (process.env.TUTORIAL_SEM_VOZ === '1') return { arquivo: null, dur: estimada };
  fs.mkdirSync(CACHE, { recursive: true });
  const arq = path.join(CACHE, crypto.createHash('sha1').update(VOZ + MODELO + VELOCIDADE + texto).digest('hex') + '.mp3');
  if (!fs.existsSync(arq)) {
    const corpo = JSON.stringify({ text: texto, model_id: MODELO, voice_settings: { stability: 0.5, similarity_boost: 0.85, style: 0.1, use_speaker_boost: true, speed: VELOCIDADE } });
    try {
      execFileSync('curl', ['-sS', '-f', '-X', 'POST', `https://api.elevenlabs.io/v1/text-to-speech/${VOZ}?output_format=mp3_44100_128`,
        '-H', 'xi-api-key: x', '-H', 'Content-Type: application/json', '--data-binary', corpo, '-o', arq], { stdio: ['ignore', 'ignore', 'pipe'] });
    } catch (e) {
      fs.rmSync(arq, { force: true });
      console.log('   (sem voz: o ElevenLabs não respondeu) ' + String(e.stderr || e.message).split('\n')[0]);
      return { arquivo: null, dur: estimada };
    }
  }
  return { arquivo: arq, dur: duracao(arq) };
}

/** Efeito sonoro gerado pelo ElevenLabs (texto em inglês descreve melhor o som). Salva em tutoriais/audio/<nome>.mp3. */
function efeito(nome, descricao, segundos) {
  const arq = path.join(__dirname, 'audio', nome + '.mp3');
  fs.mkdirSync(path.dirname(arq), { recursive: true });
  const corpo = JSON.stringify({ text: descricao, duration_seconds: segundos, prompt_influence: 0.6 });
  execFileSync('curl', ['-sS', '-f', '-X', 'POST', 'https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128',
    '-H', 'xi-api-key: x', '-H', 'Content-Type: application/json', '--data-binary', corpo, '-o', arq], { stdio: ['ignore', 'ignore', 'pipe'] });
  return arq;
}

module.exports = { falar, efeito, VOZ, MODELO, duracao };
