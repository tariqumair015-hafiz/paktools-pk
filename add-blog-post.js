#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const BLOG_FILE = path.join(__dirname, '../public/data/blog-posts.json');
const newPost = JSON.parse(process.argv[2]);
newPost.id = Date.now().toString();
newPost.published_at = new Date().toISOString();
const existing = JSON.parse(fs.readFileSync(BLOG_FILE, 'utf8'));
if (existing.find(p => p.slug === newPost.slug)) { console.log('Duplicate slug!'); process.exit(1); }
existing.unshift(newPost);
fs.writeFileSync(BLOG_FILE, JSON.stringify(existing, null, 2));
console.log('Article added: ' + newPost.title);
