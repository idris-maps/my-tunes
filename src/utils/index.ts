import fs from 'fs'
import { promisify } from 'util'
import { exec } from 'child_process'

export const run = (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => exec(cmd, (err, stdout) => {
    if (err) { return reject(err) }
    resolve(stdout)
  }))

export const safeJsonParse = (d: string) => {
  try {
    return JSON.parse(d)
  } catch (e) {
    return {}
  }
}

export const readFile = promisify(fs.readFile)
export const readTextFile = (path: string) => readFile(path, 'utf-8')
export const readJsonFile = async <T = any>(path: string): Promise<T> =>
  safeJsonParse(await readTextFile(path))

export const writeFile = promisify(fs.writeFile)
export const writeTextFile = (path: string, content: string) =>
  writeFile(path, content, 'utf-8')
export const writeJsonFile = (path: string, json: any) =>
  writeTextFile(path, JSON.stringify(json))

export const ls = promisify(fs.readdir)
