#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '../content');

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'install':
      installSkill();
      break;
    case 'install-claude':
      installClaudeSkill(args[0]);
      break;
    case 'list':
      listSkills();
      break;
    case 'get':
      if (!args[0]) {
        console.error('Error: Skill name required.');
        showHelp();
        process.exit(1);
      }
      getSkill(args[0]);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

function listSkills() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found.');
    return;
  }

  const skillFile = path.join(CONTENT_DIR, 'SKILL.md');
  if (fs.existsSync(skillFile)) {
    const content = fs.readFileSync(skillFile, 'utf-8');
    const nameMatch = content.match(/name:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);
    
    if (nameMatch) {
      console.log(`- ${nameMatch[1].trim()}: ${descMatch ? descMatch[1].trim() : ''}`);
    }
  } else {
    console.log('No skills found in SKILL.md');
  }
}

function getSkillContent(content) {
  const lines = content.split('\n');
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('name:') || line.startsWith('description:') || line === '***' || /^[-*]{3,}$/.test(line)) {
      startIdx = i + 1;
    } else if (line !== '') {
      break;
    }
  }
  return lines.slice(startIdx).join('\n').trim();
}

function getSkill(name) {
  const skillFile = path.join(CONTENT_DIR, 'SKILL.md');
  if (!fs.existsSync(skillFile)) {
    console.error('Error: SKILL.md not found.');
    return;
  }

  const content = fs.readFileSync(skillFile, 'utf-8');
  const nameMatch = content.match(/name:\s*(.*)/);
  
  if (nameMatch && nameMatch[1].trim() === name) {
    console.log(getSkillContent(content));
  } else {
    console.error(`Error: Skill "${name}" not found.`);
  }
}

function installSkill() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found in the package.');
    return;
  }

  const targetDir = path.join(process.cwd(), '.trae', 'skills', 'xiaoyun-design-system');
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    // Copy all contents from CONTENT_DIR to targetDir
    fs.cpSync(CONTENT_DIR, targetDir, { recursive: true });
    console.log(`✅ 技能 "xiaoyun-design-system" 已成功安装到本地！`);
    console.log(`📂 路径: ${path.relative(process.cwd(), targetDir)}`);
    console.log(`\n现在您可以在 Trae 中重新加载或打开 Skill 面板使用它了！`);
  } catch (error) {
    console.error('❌ 安装技能失败:', error);
  }
}

function installClaudeSkill(scope = 'project') {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error('Error: Content directory not found in the package.');
    return;
  }

  const normalizedScope = scope === 'user' || scope === '--user' || scope === '--global'
    ? 'user'
    : scope === 'project' || scope === undefined
      ? 'project'
      : null;

  if (!normalizedScope) {
    console.error('Error: Invalid scope. Use "project" or "user".');
    showHelp();
    process.exit(1);
  }

  const targetDir = normalizedScope === 'user'
    ? path.join(os.homedir(), '.claude', 'skills', 'xiaoyun-design-system')
    : path.join(process.cwd(), '.claude', 'skills', 'xiaoyun-design-system');

  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.cpSync(CONTENT_DIR, targetDir, { recursive: true });
    console.log(`✅ 技能 "xiaoyun-design-system" 已成功安装到 Claude Code！`);
    console.log(`📂 路径: ${targetDir}`);
    if (normalizedScope === 'project') {
      console.log('\n当前为项目级安装，仅对当前项目生效。');
    } else {
      console.log('\n当前为个人级安装，对当前用户的所有 Claude Code 项目生效。');
    }
    console.log('现在您可以在 Claude Code 中自动使用它，或通过 /xiaoyun-design-system 手动调用。');
  } catch (error) {
    console.error('❌ 安装 Claude Code 技能失败:', error);
  }
}

function showHelp() {
  console.log(`
Usage: xiaoyun-ds-skills <command> [args]

Commands:
  install           Install the skill to local .trae/skills/ directory
  install-claude    Install the skill to Claude Code (.claude/skills/). Optional scope: project | user
  list              List all available skills
  get <name>        Get the core prompt for a skill
  help              Show this help message
  `);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
