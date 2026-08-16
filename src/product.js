(() => {
  'use strict';

  const SAMPLE = 'Открывать ли свой бизнес?';
  const STORE = 'matrica.decision.sessions.v1';
  const input = document.querySelector('#questionInput');
  const counter = document.querySelector('#counter');
  if (!input || !counter) return;

  const rules = [
    {
      id:'safety', re:/(угрож|насили|удар|бь[её]т|опасн|преслед|шантаж)/i,
      headline:'Сначала обеспечить\nбезопасность,\nпотом решать остальное.',
      potential:'Не главное', risk:'Высокие', resources:'Нужно проверить',
      note:'Символическая интерпретация не должна\nувеличивать реальный риск.',
      signal:'Матрица здесь может дать только вопросы для рефлексии. При признаках угрозы безопасность важнее любой символической совместимости.',
      hypotheses:'Сначала проверяем не «подходим ли мы», а есть ли реальный риск, повторяемость угроз и возможность безопасно дистанцироваться.',
      facts:'Опираемся на наблюдаемое поведение, угрозы, доступ к безопасному месту и поддержке — не на обещания и не на трактовку Матрицы.',
      variants:'Не предлагаем эксперимент, который требует остаться в опасной среде. Рассматриваем только варианты, уменьшающие риск.',
      move:'Выбираем действие, которое повышает безопасность и сохраняет возможность спокойно принимать дальнейшие решения.',
      next:'Зафиксировать безопасный ближайший шаг и человека или место, к которому можно обратиться.'
    },
    {
      id:'medical', re:/(лечен|врач|операц|таблет|препарат|диагноз|здоров|медицин)/i,
      headline:'Не менять лечение\nтолько из-за Матрицы.\nПроверить факты.',
      potential:'Не оцениваем', risk:'Высокие', resources:'Эксперт + данные',
      note:'Матрица здесь — только слой рефлексии,\nне медицинское основание.',
      signal:'Матрица может помочь сформулировать вопросы о страхах, контроле и выборе, но не является медицинским доказательством.',
      hypotheses:'Разделяем символическую интерпретацию, ощущения человека и медицинские гипотезы.',
      facts:'Приоритет у диагноза, обследований, противопоказаний, динамики симптомов и профильной экспертизы.',
      variants:'Сравниваем варианты только внутри безопасного медицинского коридора.',
      move:'Не делаем необратимый медицинский ход без достаточных данных и профессиональной оценки.',
      next:'Сформулировать одно сомнение и проверить его с профильным специалистом, не отменяя назначение самостоятельно.'
    },
    {
      id:'money', re:/(влож|инвест|накоплен|деньг|кредит|ипотек|финанс|капитал)/i,
      headline:'Сохранить запас\nи проверять решение\nпоэтапно.',
      potential:'Зависит от фактов', risk:'Умеренные', resources:'Сохранить резерв',
      note:'Личный резонанс не должен\nотменять риск концентрации.',
      signal:'Матрица может подсветить отношение к риску, контролю и материальной опоре, но не ожидаемую доходность.',
      hypotheses:'Проверяем: это реальная возможность, страх упустить шанс или желание резко изменить ситуацию.',
      facts:'Нужны ликвидность, резерв, долговая нагрузка, концентрация, горизонт и сценарий потери.',
      variants:'Кроме «вложить / не вложить» добавляем частичный вход, лимит риска или ожидание новых данных.',
      move:'Выбираем решение, после которого одна ошибка не разрушает финансовую опору.',
      next:'Определить максимальную допустимую потерю и разбить решение на этапы вместо ставки «всё или ничего».'
    },
    {
      id:'relocation', re:/(переез|стран|город|эмигра|релокац|уехать|переезд)/i,
      headline:'Сначала открыть\nреальный маршрут,\nзатем выбирать сердцем.',
      potential:'Высокий', risk:'Умеренные', resources:'Проверить',
      note:'Матрица помогает сравнить личный резонанс,\nно маршрут держится на реальности.',
      signal:'Матрица используется для гипотез о среде, в которой человеку легче действовать, восстанавливаться и развиваться.',
      hypotheses:'Проверяем, решает ли переезд реальную задачу или переносит ту же проблему в другую страну.',
      facts:'Нужны документы, правила въезда, бюджет, жильё, работа, безопасность и срок легального пребывания.',
      variants:'Сравниваем остаться, переехать сразу и сделать промежуточный или обратимый маршрут.',
      move:'Предпочитаем путь, который сохраняет документы, деньги и возможность изменить решение.',
      next:'Собрать подтверждённый маршрут и его стоимость до покупки невозвратных опций.'
    },
    {
      id:'partnership', re:/(50\/50|доля|сооснов|совместн.*бизнес|бизнес.*партн[её]р)/i,
      headline:'Сначала проверить\nсовместную работу,\nпотом делить контроль.',
      potential:'Есть', risk:'Умеренные', resources:'Нужны правила',
      note:'Совместимость не заменяет\nправила ролей, денег и выхода.',
      signal:'Матрица может подсветить стиль взаимодействия, сильные стороны и конфликтные зоны, но не качество управления компанией.',
      hypotheses:'Проверяем, действительно ли нужна доля 50/50 или задачу закрывает контракт, роль, меньшая доля либо пилот.',
      facts:'Нужны вклад каждого, время, деньги, права решения, тупики голосования, конфликты интересов и условия выхода.',
      variants:'Сравниваем долевое партнёрство, подряд или найм и ограниченный совместный пилот.',
      move:'Не отдаём необратимый контроль раньше, чем проверена совместная работа.',
      next:'Провести короткий пилот с заранее определёнными результатами, ролями и правилами разрыва.'
    },
    {
      id:'relationships', re:/(отношен|любов|партн[её]р|муж|жен|девуш|парн|развод|расстат|совместим)/i,
      headline:'Не решать по эмоции.\nПроверить паттерн\nв реальном контакте.',
      potential:'Есть', risk:'Умеренные', resources:'Зависят от двоих',
      note:'Матрица предлагает вопросы,\nа решение подтверждает поведение.',
      signal:'Матрица используется как язык возможных потребностей, способов сближения, конфликтов и границ.',
      hypotheses:'Проверяем несколько объяснений: ценности, способ общения, границы, временный стресс или несовместимые ожидания.',
      facts:'Смотрим на повторяемое поведение, уважение, соблюдение договорённостей, безопасность и готовность обоих участвовать.',
      variants:'Сравниваем оставить как есть, изменить один паттерн на ограниченный срок или завершить отношения.',
      move:'Выбираем ход с ясной границей: что должно измениться и по чему станет видно, что эксперимент не работает.',
      next:'Назвать одну ключевую потребность и проверить её в спокойном разговоре, наблюдая дальнейшее поведение.'
    },
    {
      id:'business', re:/(бизнес|стартап|компан|предприним|продукт|клиент|продаж|открывать)/i,
      headline:'Двигаться постепенно\nи проверять гипотезу\nна практике.',
      potential:'Высокий', risk:'Умеренные', resources:'Достаточные',
      note:'Матрица поддерживает мягкий старт\nи обучение в процессе.',
      signal:'Темы самостоятельности и реализации рассматриваем как гипотезу о подходящем способе действовать — не как доказательство спроса.',
      hypotheses:'Проверяем три версии: нужен собственный бизнес, нужна большая автономия или просто изменились условия текущей работы.',
      facts:'Нужны спрос, реальные разговоры с клиентами, запас денег, обязательства и цена ошибки.',
      variants:'Сравниваем оставить всё как есть, уйти сразу и провести ограниченный пилот без резкого отказа от текущей опоры.',
      move:'Предпочитаем ход, который даёт максимум новой информации при минимуме необратимого риска.',
      next:'Проверить реальный спрос малым тестом до необратимых вложений.'
    },
    {
      id:'career', re:/(работ|профес|карьер|должност|выгор|увольн)/i,
      headline:'Сначала понять,\nчто именно не подходит,\nпотом менять масштаб.',
      potential:'Высокий', risk:'Умеренные', resources:'Достаточные',
      note:'Матрица помогает искать подходящую роль,\nа факты отличают роль от профессии.',
      signal:'Матрица может подсветить предпочитаемый способ реализации, уровень автономии и тип нагрузки.',
      hypotheses:'Отдельно проверяем «не та компания», «не та роль» и «не та профессия», не принимая усталость за готовый ответ.',
      facts:'Нужны энергия на разных задачах, рынок, навыки, доход, обратная связь и признаки выгорания.',
      variants:'Сравниваем смену условий, роли и профессии как три разных решения.',
      move:'Выбираем самый дешёвый тест, который различит эти гипотезы.',
      next:'Провести один реальный тест новой роли или задачи до большого карьерного разворота.'
    },
    {
      id:'other', re:/.*/,
      headline:'Не угадывать ответ.\nСначала проверить\nглавную гипотезу.',
      potential:'Есть', risk:'Нужно уточнить', resources:'Проверить',
      note:'Матрица расширяет взгляд,\nа выбор подтверждает реальность.',
      signal:'Берём из Матрицы только темы, относящиеся к вопросу, и не превращаем символику в факт.',
      hypotheses:'Создаём минимум две конкурирующие гипотезы, чтобы не подгонять решение под желаемый ответ.',
      facts:'Разделяем известное, неизвестное и то, что можно быстро проверить.',
      variants:'Добавляем третий путь между «да» и «нет» — ограниченный эксперимент.',
      move:'Выбираем ход с хорошим соотношением новой информации, пользы и обратимости.',
      next:'Сформулировать самый маленький обратимый шаг, который даст новую информацию о решении.'
    }
  ];

  const protocolTitles = ['Вопрос','Сигналы','Гипотезы','Факты','Варианты','Ход','Следующий шаг'];
  let currentRule = rules.find(r => r.id === 'business');
  let protocolIndex = 0;
  let touchStartX = null;

  const safeGet = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORE) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  };
  const safeSet = (value) => {
    try { localStorage.setItem(STORE, JSON.stringify(value)); } catch {}
  };
  const esc = (value='') => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const multiline = (el, value) => { if (el) el.innerHTML = esc(value).replace(/\n/g,'<br>'); };
  const question = () => input.value.trim();

  function detect() {
    const text = question() || SAMPLE;
    currentRule = rules.find(rule => rule.re.test(text)) || rules[rules.length - 1];
    return currentRule;
  }

  function activeStep() {
    return Number(document.querySelector('.phone.mobile-active')?.dataset.step || 1);
  }

  function forceStep(step) {
    const next = Math.max(1, Math.min(5, Number(step) || 1));
    document.querySelectorAll('.phone').forEach(phone => phone.classList.toggle('mobile-active', Number(phone.dataset.step) === next));
    document.querySelectorAll('.step-rail button').forEach(button => button.classList.toggle('active', Number(button.dataset.go) === next));
    if (next >= 3) sync();
  }

  function tip(title, text) {
    const card = document.querySelector('.tip-card');
    if (!card) return;
    card.classList.remove('closed');
    card.classList.add('attention');
    card.querySelector('strong').textContent = title;
    card.querySelector('p').textContent = text;
  }

  function valid() {
    if (question().length >= 10) return true;
    tip('Нужно чуть конкретнее','Напишите один выбор или решение — хотя бы в одном коротком предложении.');
    forceStep(2);
    input.focus();
    return false;
  }

  function sync() {
    const rule = detect();
    const first = document.querySelector('.protocol-row[data-protocol="0"] small');
    const q = question() || SAMPLE;
    if (first) first.textContent = q.length > 42 ? `${q.slice(0,39)}…` : q;

    multiline(document.querySelector('.result-card h4'), rule.headline);
    const metrics = document.querySelectorAll('.result-card .metrics em');
    if (metrics[0]) metrics[0].textContent = rule.potential;
    if (metrics[1]) metrics[1].textContent = rule.risk;
    if (metrics[2]) metrics[2].textContent = rule.resources;
    multiline(document.querySelector('.result-note'), rule.note);
  }

  function ensureSheet() {
    if (document.querySelector('#productSheet')) return;
    document.body.insertAdjacentHTML('beforeend',`
      <div class="product-sheet" id="productSheet" aria-hidden="true">
        <button class="sheet-backdrop" aria-label="Закрыть"></button>
        <section class="sheet-card" role="dialog" aria-modal="true" aria-labelledby="sheetTitle" tabindex="-1">
          <div class="sheet-handle"></div>
          <p class="sheet-eyebrow"></p>
          <h3 id="sheetTitle"></h3>
          <div class="sheet-body"></div>
          <div class="sheet-actions"></div>
        </section>
      </div>`);
  }

  function openSheet({eyebrow='',title,body,back=null,next=null}) {
    ensureSheet();
    const sheet = document.querySelector('#productSheet');
    sheet.querySelector('.sheet-eyebrow').textContent = eyebrow;
    sheet.querySelector('#sheetTitle').textContent = title;
    sheet.querySelector('.sheet-body').innerHTML = body;
    const actions = sheet.querySelector('.sheet-actions');
    actions.innerHTML = '';
    [back,next].filter(Boolean).forEach(action=>{
      const button=document.createElement('button');
      button.className=`sheet-btn${action.primary?' primary':''}`;
      button.textContent=action.label;
      button.dataset.action=action.id;
      actions.appendChild(button);
    });
    sheet.classList.add('open');
    sheet.setAttribute('aria-hidden','false');
    document.body.classList.add('sheet-open');
    sheet.querySelector('.sheet-card').focus();
  }

  function closeSheet() {
    const sheet=document.querySelector('#productSheet');
    if (!sheet) return;
    sheet.classList.remove('open');
    sheet.setAttribute('aria-hidden','true');
    document.body.classList.remove('sheet-open');
  }

  function detail(index) {
    sync();
    protocolIndex=index;
    document.querySelectorAll('.protocol-row').forEach((row,i)=>row.classList.toggle('active',i===index));
    const rule=currentRule;
    const bodies=[
      `<p>Сводим переживание к одному решаемому вопросу — без попытки получить от Матрицы готовый приговор.</p><div class="sheet-fact"><span>Ваш вопрос</span><strong>${esc(question()||SAMPLE)}</strong></div>`,
      `<p>${esc(rule.signal)}</p>`,
      `<p>${esc(rule.hypotheses)}</p>`,
      `<p>${esc(rule.facts)}</p>`,
      `<p>${esc(rule.variants)}</p>`,
      `<p>${esc(rule.move)}</p>`,
      `<p>${esc(rule.next)}</p><div class="sheet-fact"><span>Критерий</span><strong>Шаг должен дать новую информацию и по возможности оставаться обратимым.</strong></div>`
    ];
    openSheet({
      eyebrow:`${index+1} / 7 · Анализ решения`,
      title:protocolTitles[index],
      body:bodies[index],
      back:index>0?{id:'prev',label:'Назад'}:null,
      next:index<6?{id:'next',label:'Следующий шаг',primary:true}:{id:'result',label:'Показать рекомендацию',primary:true}
    });
  }

  function matrixInfo() {
    openSheet({
      eyebrow:'Как читать экран',
      title:'Матрица — не приговор',
      body:`<p>Этот экран нужен, чтобы заметить релевантные архетипические сигналы. В анализе они становятся гипотезами и обязательно сверяются с фактами.</p><div class="sheet-fact"><span>Правило</span><strong>Сигнал → гипотеза → проверка → действие</strong></div>`,
      next:{id:'analysis',label:'Перейти к анализу',primary:true}
    });
  }

  function save() {
    sync();
    const list=safeGet();
    const q=question()||SAMPLE;
    const item={id:Date.now(),question:q,recommendation:currentRule.headline.replace(/\n/g,' '),next:currentRule.next};
    safeSet([item,...list.filter(x=>x.question!==q)].slice(0,8));
    const button=document.querySelector('.save-btn');
    if (button) button.innerHTML='✓ &nbsp; Сохранено';
  }

  function history() {
    const items=safeGet();
    openSheet({
      eyebrow:'История',
      title:items.length?'Ваши решения':'История пуста',
      body:items.length
        ? `<div class="history-list">${items.map(item=>`<button class="history-item" data-session="${item.id}"><strong>${esc(item.question)}</strong><span>${esc(item.recommendation)}</span></button>`).join('')}</div>`
        : '<p>Сохранённых решений пока нет. На экране рекомендации нажмите «Сохранить результат».</p>',
      next:{id:'close',label:'Готово',primary:true}
    });
  }

  function action() {
    sync();
    openSheet({
      eyebrow:'Минимальный обратимый шаг',
      title:'Что сделать сейчас',
      body:`<p>${esc(currentRule.next)}</p><div class="sheet-fact"><span>Зачем</span><strong>Получить новую реальную информацию, не ставя всё решение на одну попытку.</strong></div>`,
      back:{id:'save',label:'Сохранить'},
      next:{id:'started',label:'Начать',primary:true}
    });
  }

  function makeBottomNavUseful() {
    const matrixNav=document.querySelectorAll('.matrix-screen .bottom-nav span');
    const analysisNav=document.querySelectorAll('.analysis-screen .bottom-nav span');
    const wire=(el,fn,label)=>{
      if (!el) return;
      el.setAttribute('role','button'); el.setAttribute('tabindex','0'); el.setAttribute('aria-label',label);
      el.addEventListener('click',fn);
      el.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();fn();} });
    };
    wire(matrixNav[0],()=>{if(valid()) forceStep(4);},'Открыть обзор решения');
    wire(matrixNav[2],history,'Открыть историю');
    wire(analysisNav[1],()=>forceStep(3),'Открыть матрицу');
    wire(analysisNav[2],history,'Открыть историю');
  }

  forceStep(1);
  counter.textContent=`${input.value.length} / 300`;
  sync();
  makeBottomNavUseful();

  input.addEventListener('focus',()=>{ if(input.value===SAMPLE) input.select(); });
  input.addEventListener('input',()=>{
    counter.textContent=`${input.value.length} / 300`;
    const card=document.querySelector('.tip-card');
    if(question().length>=10&&card){
      card.classList.remove('attention','closed');
      card.querySelector('strong').textContent='Совет';
      card.querySelector('p').textContent='Чем яснее вопрос, тем точнее матрица и рекомендации.';
    }
    const saveButton=document.querySelector('.save-btn');
    if(saveButton) saveButton.innerHTML='♡ &nbsp; Сохранить результат';
    sync();
  });

  document.addEventListener('click',event=>{
    const go=event.target.closest('[data-go]');
    if(go&&Number(go.dataset.go)>=3&&!valid()){
      event.preventDefault(); event.stopPropagation();
    }
  },true);

  document.addEventListener('click',event=>{
    if(event.target.closest('.info-btn')) { matrixInfo(); return; }
    const row=event.target.closest('.protocol-row');
    if(row) { detail(Number(row.dataset.protocol)); return; }
    if(event.target.closest('.result-action')) { action(); return; }
    if(event.target.closest('.save-btn')) { save(); return; }

    const session=event.target.closest('[data-session]');
    if(session){
      const item=safeGet().find(x=>String(x.id)===session.dataset.session);
      if(item){
        input.value=item.question;
        counter.textContent=`${input.value.length} / 300`;
        sync(); closeSheet(); forceStep(5);
      }
      return;
    }

    if(event.target.closest('.sheet-backdrop')) { closeSheet(); return; }
    const actionButton=event.target.closest('[data-action]');
    if(!actionButton) return;
    const id=actionButton.dataset.action;
    if(id==='prev'){closeSheet();detail(Math.max(0,protocolIndex-1));}
    if(id==='next'){closeSheet();detail(Math.min(6,protocolIndex+1));}
    if(id==='result'){closeSheet();forceStep(5);}
    if(id==='analysis'){closeSheet();forceStep(4);}
    if(id==='save'){save();closeSheet();}
    if(id==='started'){save();actionButton.textContent='Шаг начат ✓';setTimeout(closeSheet,600);}
    if(id==='close')closeSheet();
  });

  document.addEventListener('touchstart',event=>{
    touchStartX=event.changedTouches?.[0]?.clientX??null;
  },{capture:true,passive:true});
  document.addEventListener('touchend',event=>{
    if(touchStartX==null)return;
    const delta=(event.changedTouches?.[0]?.clientX??touchStartX)-touchStartX;
    touchStartX=null;
    if(activeStep()===2&&delta<-55&&!valid())event.stopPropagation();
  },{capture:true,passive:true});

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){closeSheet();return;}
    if(document.querySelector('#productSheet')?.classList.contains('open')){
      if(event.key==='ArrowLeft'||event.key==='ArrowRight')event.stopPropagation();
      return;
    }
    if(event.target.matches('textarea,input')){
      if(event.key==='ArrowLeft'||event.key==='ArrowRight')event.stopPropagation();
      return;
    }
    if(event.key==='ArrowRight'&&activeStep()===2&&!valid()){
      event.preventDefault();event.stopPropagation();
    }
  },true);
})();