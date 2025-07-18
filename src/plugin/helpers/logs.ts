import type { VariantLog } from "../../shared/types";

export function logInstanceProps(instance: InstanceNode) {
    if (!instance.componentProperties) return;
    for (const key in instance.componentProperties) {
      const val = instance.componentProperties[key].value;
      console.log(`         • ${key} = ${val}`);
    }
}

export function logVariant(v: VariantLog) {
    console.log('─────────');
    console.log('📑 Variante:', v.name, ' - ', v.position);

    if (v.instances.length === 0) {
        console.log('   ⚠️ Sin instancias registradas.');
        return;
    }

    v.instances.forEach((inst) => {
        const status = inst.applyTemplate ? '✅' : '❌';
        console.log(
        `  ${status} ${inst.type} = 📒 ${inst.templatePrice || '-'} |`,
        `  💸 Antes =${inst.priceBefore || '-'} -> Después =${inst.priceAfter || '-'}`
        );
    });
}

export function logSummary(logs: VariantLog[]) {    
    const instances = logs.flatMap((v) => v.instances);
    return {
        vars: {
            total: logs.length,
            updated: logs.filter((v) => v.valid).length,
            skipped: logs.length - logs.filter((v) => v.valid).length,
        },
        inst: {
            total: instances.length,
            applied: instances.filter((i) => i.applyTemplate).length,
            omitted: instances.filter((i) => !i.applyTemplate).length,
        },
    };
}

export function logConsole(vars: Record<string, number>, inst: Record<string, number>) {
    console.log('══════════════════════════════════════════');
    console.log(`📊 SUMMARY`);
    console.log(`   ▸ Total variants:       ${vars.total}`);
    console.log(`   ▸ ✅ Updated variants:    ${vars.updated}`);
    console.log(`   ▸ ⚠️ Omitted variants:     ${vars.skipped}`);
    console.log(`   ▸ Total instances:      ${inst.total}`);
    console.log(`   ▸ 🟢 Applied instances:    ${inst.applied}`);
    console.log(`   ▸ 🔴 Omitted instances:    ${inst.omitted}`);
    console.log('══════════════════════════════════════════');
}

export function logComponentSetVariantInfo(set: ComponentSetNode) {
    const groups = set.variantGroupProperties;          

    if (!groups) {
        console.warn("⚠️ Este ComponentSet no tiene variantGroupProperties definido.");
        return;
    }

    console.log(`\n🔎 PROPIEDADES DEL COMPONENT SET «${set.name}»`);
    for (const [prop, values] of Object.entries(groups)) {
        console.log(`   • ${prop}: ${values.values.join(" | ")}`);
    }
    console.log("──────────────────────────────────────────────");
}

export async function getCurrentInstanceProps(instance: InstanceNode): Promise<Record<string, string>> {
    const props: Record<string, string> = {};

    // 1️⃣ Obtener propiedades actuales
    const rawProps = instance.variantProperties;
    if (!rawProps) return props;

    // 2️⃣ Obtener main component
    const main = await instance.getMainComponentAsync();
    if (!main) {
        console.warn("⚠️ La instancia no tiene mainComponent.");
        return props;
    }

    // 3️⃣ Obtener el ComponentSet padre
    const set = main.parent;
    if (!set || set.type !== "COMPONENT_SET") {
        console.warn("⚠️ El mainComponent no pertenece a un ComponentSet.");
        return props;
    }

    const validGroupProps = set.variantGroupProperties;

    // 4️⃣ Solo agregar propiedades que estén definidas en el set
    for (const key in rawProps) {
        if (
            Object.prototype.hasOwnProperty.call(rawProps, key) &&
            key in validGroupProps &&
            typeof rawProps[key] === "string"
        ) {
            const value = rawProps[key] as string;
            props[key] = value;
        } else {
            console.warn(`⚠️ Propiedad omitida → ${key}`);
        }
    }

    return props;
}

export function getCurrentVariantProps(instance: InstanceNode): Record<string, string> {
    const props: Record<string, string> = {};

    const rawProps = instance.variantProperties;
    if (!rawProps) return props;

    for (const key in rawProps) {
        if (Object.prototype.hasOwnProperty.call(rawProps, key)) {
            const val = rawProps[key];
            if (typeof val === "string") {
                props[key] = val;
            }
        }
    }

    return props;
}
